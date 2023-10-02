const Controller = require("./controller");
const ContentService = require("../services/content-service");
const { logger } = require("../lib/log");

class ContentController extends Controller {
  /**
   *  @api {post} /api/v1/content that creates a new content
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Bad request HTTP/1.1 400 (Validation failed)
   *  @apiError Internal error HTTP/1.1 500
   *
   * */
  async create_content(req, res, next) {
    logger.info("ContentController -> create_content -> started");
    try {
      const input = req.body;
      const cs = new ContentService();
      const result = await cs.create_content(input);
      this.send_response(res, "success", result);
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }

  /**
   *  @api {post} /api/v1/content/ingest that ingests records based on csv provided
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Internal error HTTP/1.1 500
   *
   * */
  async ingest_records(req, res, next) {
    logger.info("ContentController -> ingest_records -> started");
    try {
      const input = req.file;
      const cs = new ContentService();
      logger.info(req.file);
      const result = await cs.ingest_records(input);
      this.send_response(res, "success", result);
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }

  /**
   *  @api {get} /api/v1/content/:id returns the content that match the id.
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccess content json
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Bad request HTTP/1.1 404 (Not found)
   *  @apiError Internal error HTTP/1.1 500
   *
   * */

  async get_content_by_id(req, res, next) {
    logger.info("ContentController -> get_content_by_id -> started");
    try {
      const id = req.params.id;
      const cs = new ContentService();
      const result = await cs.get_content_by_id(id);
      this.send_response(res, "success", result);
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }

  /**
   *  @api {delete} /api/v1/content/:id delete the content that match the id.
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccess Success message
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Bad request HTTP/1.1 404 (Not found)
   *  @apiError Internal error HTTP/1.1 500
   *
   * */

  async delete_content_by_id(req, res, next) {
    logger.info("ContentController -> delete_content_by_id -> started");
    try {
      const id = req.params.id;
      const cs = new ContentService();
      await cs.delete_content_by_id(id);
      this.send_response(res, "success");
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }

  /**
   *  @api {put} /api/v1/content/:id update the content that match the id.
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccess updated content json
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Bad request HTTP/1.1 404 (Not found)
   *  @apiError Internal error HTTP/1.1 500
   *
   * */

  async update_content_by_id(req, res, next) {
    logger.info("ContentController -> update_content_by_id -> started");
    try {
      const id = req.params.id;
      const cs = new ContentService();
      const response = await cs.update_content_by_id(id, req.body);
      this.send_response(res, "success", response);
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }

  /**
   *  @api {get} /api/v1/content/new returns the list of content sorted on date published.
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccess [content] based on the filter criteria
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Internal error HTTP/1.1 500
   *
   * */
  async get_new_content(req, res, next) {
    logger.info("ContentController -> get_new_content -> started");
    try {
      const cs = new ContentService();
      const response = await cs.get_new_content();
      this.send_response(res, "success", response);
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }

  /**
   *  @api {get} /api/v1/content/top returns the list of content sorted on user-interaction.
   *  @apiName content @apiVersion 1.0.0
   *  @apiSuccess [content] based on the filter criteria
   *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
   *  @apiError Internal error HTTP/1.1 500
   *
   * */
  async get_top_content(req, res, next) {
    logger.info("ContentController -> get_top_content -> started");
    try {
      const cs = new ContentService();
      const response = await cs.get_top_content();
      this.send_response(res, "success", response);
    } catch (error) {
      logger.info(error);
      this.handle_error_response(error, res, next);
    }
  }
}

module.exports = ContentController;
