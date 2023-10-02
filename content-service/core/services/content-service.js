const ContentModel = require("../schemas/contentSchema");
const Controller = require("../controllers/controller");
const ApiRepository = require("../repository/api-repository");
const fs = require("fs");
const { logger } = require("../lib/log");
const path = require('path');

class ContentService {
  async create_content(input) {
    logger.info("ContentService -> create_content -> started");
    let content = new ContentModel(input);

    let error = content.validateSync();

    if (error) {
      let e = Controller.get_error("badRequest", error.message);
      throw e;
    }

    let result = await ContentModel.create(content);
    return result;
  }

  async ingest_records(input) {
    logger.info("ContentService -> ingest_records -> started");
    const file_path = input.path;
    const records = await this.parse_csv(file_path);
    const result = await ContentModel.insertMany(records);
    return result;
  }

  async parse_csv(file_path) {
    logger.info("ContentService -> parse_csv -> started");
    return new Promise((resolve, reject) => {
      const records = [];

      // Convert the buffer to a string
      let two_step_back = path.join(__dirname, '../../');
      const csv_data = fs.readFileSync(two_step_back + file_path, "utf-8");

      csv_data
        .split("\n") // Split CSV data by newline
        .slice(1) // Skip the header row if present
        .forEach((line) => {
          const [title, story, user_id] = line.split(","); // Adjust CSV column names accordingly

          if (title && story && user_id) {
            records.push({
              title,
              story,
              user_id,
            });
          }
        });

      resolve(records);
    });
  }

  async delete_content_by_id(id) {
    logger.info("ContentService -> delete_content_by_id -> started");
    let content = null;

    try {
      content = await ContentModel.findByIdAndDelete(id);
    } catch (error) {
      let e = Controller.get_error(
        "notFound",
        `content not found for id ${id}`
      );
      throw e;
    }
    return content;
  }

  async get_content_by_id(id) {
    logger.info("ContentService -> get_content_by_id -> started");
    let content = null;

    try {
      content = await ContentModel.findById(id);
    } catch (error) {
      logger.info(error);
      let e = Controller.get_error(
        "notFound",
        `content not found for id ${id}`
      );
      throw e;
    }

    return content;
  }

  async update_content_by_id(id, input) {
    logger.info("ContentService -> update_content_by_id -> started");
    let content = null;

    const { title, story, user_id } = input;

    try {
      content = await ContentModel.findById(id);
    } catch (error) {
      logger.info(error);
      let e = Controller.get_error(
        "notFound",
        `content not found for id ${id}`
      );
      throw e;
    }

    if (title) {
      content.title = title;
    }

    if (story) {
      content.story = story;
    }

    if (user_id) {
      content.user_id = user_id;
    }

    let error = content.validateSync();

    if (error) {
      let e = Controller.get_error("badRequest", error.message);
      throw e;
    }

    await ContentModel.updateOne({ _id: id }, { $set: content });

    return content;
  }

  async get_new_content() {
    logger.info("ContentService -> get_new_content -> started");
    const contents = await ContentModel.find().sort({ date_published: -1 });
    return contents;
  }

  async get_top_content(input) {
    logger.info("ContentService -> get_top_content -> started");
    let top_interactions = await ApiRepository.get_top_interactions();

    if (!top_interactions?.data) {
      let e = Controller.get_error("notFound", `top content not found`);
      throw e;
    }
    let content_ids = top_interactions.data.map((obj) => obj.content_id);

    let top_content_details = null;
    try {
      top_content_details = await ContentModel.find({
        _id: { $in: content_ids },
      });
    } catch (error) {
      logger.info(error);
      let e = Controller.get_error(
        "notFound",
        `content not found for id ${id}`
      );
      throw e;
    }

    return top_content_details;
  }
}
module.exports = ContentService;
