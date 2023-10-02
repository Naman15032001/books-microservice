/* jshint esversion: 8 */
/*jslint node: true */
const HttpUtils = require('../utils/http-util');

class ApiRepository {

    static async get_top_interactions(input_id) {
        const endpoint = process.env.INTERACTION_SERVICE_URL + '/api/v1/interaction/top';
        return await new HttpUtils().get(endpoint);
    }
}
module.exports = ApiRepository;