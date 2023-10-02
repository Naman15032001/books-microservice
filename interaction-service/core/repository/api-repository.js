/* jshint esversion: 8 */
/*jslint node: true */
const HttpUtils = require('../utils/http-util');

class ApiRepository {

    static async get_content(input_id) {
        const endpoint = process.env.CONTENT_SERVICE_URL + `/api/v1/content/${input_id}`;
        return await new HttpUtils().get(endpoint);
    }

    static async get_user(input_id) {
        const endpoint = process.env.USER_SERVICE_URL + `/api/v1/user/${input_id}`;
        return await new HttpUtils().get(endpoint);
    }
}
module.exports = ApiRepository;