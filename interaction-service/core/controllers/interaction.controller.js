const Controller = require("./controller");
const InteractionService = require("../services/interaction-service");
const { logger } = require("../lib/log");

class InteractionController extends Controller {

    /**
    *  @api {post} /api/v1/interaction that creates a new interaction 
    *  @apiName interaction @apiVersion 1.0.0
    *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
    *  @apiError Bad request HTTP/1.1 400 (Validation failed)
    *  @apiError Bad request HTTP/1.1 404 (Not found)
    *  @apiError Internal error HTTP/1.1 500
    *
    * */
    async add_interaction(req, res, next) {
        logger.info('InteractionController -> add_interaction -> started')
        try {
            const input = req.body;
            const is = new InteractionService();
            const result = await is.create_interaction(input);
            this.send_response(res, "success", result);
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {get} /api/v1/interaction/:id returns the interaction that match the id.
     *  @apiName interaction @apiVersion 1.0.0
     *  @apiSuccess interaction json
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async get_interaction_by_id(req, res, next) {
        logger.info('InteractionController -> get_interaction_by_id -> started')
        try {
            const id = req.params.id;
            const is = new InteractionService();
            const result = await is.get_interaction_by_id(id);
            this.send_response(res, "success", result);
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }

     /**
     *  @api {get} /api/v1/interaction/top returns the top content_ids based on interaction count.
     *  @apiName interaction @apiVersion 1.0.0
     *  @apiSuccess [content_id] json
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async get_top_interactions(req, res, next) {
        logger.info('InteractionController -> get_top_interactions -> started')
        try {
            const is = new InteractionService();
            const response = await is.get_top_interactions();
            this.send_response(res, "success", response);
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }
}

module.exports = InteractionController;
