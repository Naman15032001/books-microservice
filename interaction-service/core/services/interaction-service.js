const InteractiontModel = require("../schemas/interactionSchema");
const Controller = require("../controllers/controller");
const ApiRepository = require('../repository/api-repository');
const { logger } = require("../lib/log");

class InteractionService {

  async create_interaction(input) {
    logger.info('InteractionService -> create_interaction -> started')
    let interaction = new InteractiontModel(input);

    let error = interaction.validateSync();

    if (error) {
      let e = Controller.get_error("badRequest", error.message);
      throw e;
    }
    
    let content_response = await ApiRepository.get_content(input.content_id);
    
    if (!content_response?.data) {
      let e = Controller.get_error("notFound", `content not found for id ${input.content_id}`);
      throw e;
    }

    let user_response = await ApiRepository.get_user(input.user_id);

    if (!user_response?.data) {
      let e = Controller.get_error("notFound", `user not found for id ${input.user_id}`);
      throw e;
    }
   
    let result = await InteractiontModel.create(interaction);
    return result;
  }


  async get_interaction_by_id(id) {
    logger.info('InteractionService -> get_interaction_by_id -> started')
    let interaction = null;
    try {
      interaction = await InteractiontModel.findById(id);
    } catch (error) {
      logger.info(error)
      let e = Controller.get_error("notFound", `interaction not found for id ${id}`);
      throw e;
    }

    return interaction;
  }

  async get_top_interactions(input) {
    logger.info('InteractionService -> get_top_interactions -> started')
    const pipeline = [
      {
        $group: {
          _id: '$content_id',
          interaction_count: { $sum: 1 }, // Count interactions
        },
      },
      {
        $sort: { interactionCount: -1 }, // Sort by interaction count in descending order
      },
      {
        $limit: 10, // getting top 10
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          content_id: '$_id', // Include the interaction_id field
        },
      },
    ];
    // Execute the aggregation pipeline
    const top_interaction_ids = await InteractiontModel.aggregate(pipeline);
    return top_interaction_ids
  }

}
module.exports = InteractionService;
