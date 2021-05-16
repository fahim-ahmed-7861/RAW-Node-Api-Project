/*
 * Title: Uptime Monitoring NotFoundHandler
 * Description: 404
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// module scaffolding

const handler = {};

handler.notFoundHandler = (requestProperties,callback)=>
{
    
    callback(404,{
        message : 'Your Requested url not found',
    })
  
}


module.exports = handler;