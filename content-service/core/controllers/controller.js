const ApiError = require("../api-error");
const API_RESPONSE = require("../lib/constants").apiResponses;

class Controller {
  static get_error(category, description) {
    let response = API_RESPONSE[category];
    const err = new ApiError(response.description);
    err.status = response.status;
    err.http_code = response.http_code;
    err.error_code = response.error_code;
    if (description) {
      err.error_message = description;
    }
    return err;
  }

  handle_error_response(err, res, next) {
    if (err instanceof ApiError) {
      const responseObj = {
        error_code: err.error_code,
        http_code: err.http_code,
        error_message: err.error_message || err.data || err.message,
      };
      res.status(responseObj.http_code);
      return res.json(responseObj);
    }
    let err_obj = Controller.get_error("internalError");
    res.status(err_obj.http_code);
    return res.json(err_obj);
  }

  send_response(res, category, content) {
    let response = API_RESPONSE[category];

    if (!content) {
      content = {
        message: response.description,
      };
    }
    return res.status(response.status).json(content);
  }
}

module.exports = Controller;
