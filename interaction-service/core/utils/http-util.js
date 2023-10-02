/* jshint esversion: 8 */
/*jslint node: true */
const axios = require('axios');
const {
    logger
} = require('../lib/log')

class HttpUtil {

    async post(url, request, headers = {
        "Content-Type": "application/json",
    }) {

        logger.debug('HttpUtil post req started');
        try {
            const response = await axios.post(url, request, headers);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async get(url, params, header = {
        "Content-Type": "application/json",
    }) {
        logger.debug('HttpUtil get req started');
        try {
            const response = await axios.get(url, params, header);
            return response;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = HttpUtil;