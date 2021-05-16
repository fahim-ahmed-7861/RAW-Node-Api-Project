/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies


const {StringDecoder} = require('string_decoder')
const url = require('url');
const routes = require('../routes.js')
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');


// handleReqRes-object module scaffolding
const handler = {};

handler.handleReqRes=(req,res)=>
{
    //request handling

    const parsedURL = url.parse(req.url,true);
    const path = parsedURL.pathname;
    const trimedPath = path.replace(/^\/+|\/$/g,'')
    const method = req.method.toLowerCase();
    const queryStringObject = parsedURL.query;
    const headersObject = req.headers;

    const requestProperties = {
        
        parsedURL,
        path,
        trimedPath,
        method,
        queryStringObject,
        headersObject

    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimedPath] ? routes[trimedPath] : notFoundHandler;


    chosenHandler(requestProperties,(statusCode,payload)=>
    {
        statusCode = typeof(statusCode)==='number' ? statusCode : 500;

        payload = typeof(payload)==='object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString)

        

    })




    req.on('data',(buffer)=>{ 
        realData+= decoder.write(buffer);
    })

    req.on('data',()=>
    {
        realData += decoder.end();

        console.log(realData);

        //res.end('Hello world');
    })

}



module.exports = handler
