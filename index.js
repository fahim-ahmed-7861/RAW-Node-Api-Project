/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies

const http = require('http');
const url = require('url');
const {handleReqRes} = require('./helpers/handleReqRes')


// app-object module scaffolding
const app = {};

//configuration 
app.config = {

    port : 3000
};

//createServer
app.createServer = ()=>
{
    const server = http.createServer(app.handleReqRes);

    server.listen(app.config.port,()=>
    {
        console.log(`listening to port ${app.config.port}`)
    });

}


// handle response request

app.handleReqRes = handleReqRes;

// start the server

app.createServer();


