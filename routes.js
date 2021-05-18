/*
 * Title: Uptime Monitoring Routes
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} =  require('./handlers/routeHandlers/userHandler');
const {tokenHandler} =  require('./handlers/routeHandlers/tokenHandler');
const {checkHandler} =  require('./handlers/routeHandlers/checkHandler');

const routes = {
    sample: sampleHandler,
    user : userHandler,
    token : tokenHandler,
    check : checkHandler,
};

module.exports = routes;