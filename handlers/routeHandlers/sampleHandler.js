/*
 * Title: Uptime Monitoring Routes
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// module scaffolding

const handler = {};

handler.sampleHandler = (requestProperties,callback)=>
{
    
    callback(200,{
        message : 'This is a sample url',
    })
  
}

module.exports = handler;