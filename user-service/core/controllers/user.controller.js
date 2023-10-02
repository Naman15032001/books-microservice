const Controller = require("./controller");
const UserService = require("../services/user-service");
const { logger } = require('../lib/log')

class UserController extends Controller {

    /**
     *  @api {post} /api/v1/user that creates a new user
     *  @apiName user @apiVersion 1.0.0 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 400 (Validation failed)
     *  @apiError Internal error HTTP/1.1 500
     *
   * */
    async create_user(req, res, next) {
        logger.info('UserController -> create_user -> started');
        try {
            const input = req.body;
            const us = new UserService();
            const result = await us.create_user(input);
            this.send_response(res, "success", result);
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {get} /api/v1/user/:id returns the user that match the id.
     *  @apiName user @apiVersion 1.0.0 
     *  @apiSuccess user json 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
   * */
    async get_user_by_id(req, res, next) {
        logger.info('UserController -> get_user_by_id -> started');
        try {
            const id = req.params.id;
            const us = new UserService();
            const result = await us.get_user_by_id(id);
            this.send_response(res, "success", result);
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {delete} /api/v1/user/:id delete the user that match the id.
     *  @apiName user @apiVersion 1.0.0 
     *  @apiSuccess Success message
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async delete_user_by_id(req, res, next) {
        logger.info('UserController -> delete_user_by_id -> started');
        try {
            const id = req.params.id;
            const us = new UserService();
            await us.delete_user_by_id(id);
            this.send_response(res, "success");
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {put} /api/v1/user/:id update the user that match the id.
     *  @apiName user @apiVersion 1.0.0 
     *  @apiSuccess updated user json 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
   * */
    async update_user_by_id(req, res, next) {
        logger.info('UserController -> update_user_by_id -> started');
        try {
            const id = req.params.id;
            const us = new UserService();
            const response = await us.update_user_by_id(id, req.body);
            this.send_response(res, "success", response);
        } catch (error) {
            logger.info(error)
            this.handle_error_response(error, res, next);
        }
    }
}

module.exports = UserController;
