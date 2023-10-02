const UserModel = require("../schemas/userSchema");
const Controller = require("../controllers/controller");
const { logger } = require('../lib/log')

class UserService {
  async create_user(input) {
    logger.info('UserService -> create_user -> started')
    let user = new UserModel(input);

    let error = user.validateSync();

    if (error) {
      let e = Controller.get_error("badRequest", error.message);
      throw e;
    }

    let result = await UserModel.create(user);
    return result;
  }

  async delete_user_by_id(id) {
    logger.info('UserService -> delete_user_by_id -> started')
    let user = null;

    try {
      user = await UserModel.findByIdAndDelete(id, {
        _id: 0,
        __v: 0,
      });
    } catch (error) {
      let e = Controller.get_error("notFound", `user not found for id ${id}`);
      throw e;
    }
    return user;
  }

  async get_user_by_id(id) {
    logger.info('UserService -> get_user_by_id -> started')
    let user = null;

    try {
      user = await UserModel.findById(id);
    } catch (error) {
      logger.info(error);
      let e = Controller.get_error("notFound", `user not found for id ${id}`);
      throw e;
    }

    return user;
  }

  async update_user_by_id(id, input) {
    logger.info('UserService -> update_user_by_id -> started')
    let user = null;

    const { first_name, last_name, email, phone_number } = input;

    try {
      user = await UserModel.findById(id);
    } catch (error) {
      logger.info(error);
      let e = Controller.get_error("notFound", `user not found for id ${id}`);
      throw e;
    }

    if (first_name) {
      user.first_name = first_name;
    }

    if (last_name) {
      user.last_name = last_name;
    }

    if (email) {
      user.email = email;
    }

    if (phone_number) {
      user.phone_number = phone_number;
    }

    let error = user.validateSync();

    if (error) {
      let e = Controller.get_error("badRequest", error.message);
      throw e;
    }

    await UserModel.updateOne({ _id: id }, { $set: user });

    return user;
  }
}
module.exports = UserService;
