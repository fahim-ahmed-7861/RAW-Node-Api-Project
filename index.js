/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies

const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes')
const environment = require('./helpers/environments')
const data = require('./lib/data')



// app-object module scaffolding
const app = {};

//Testing : pore muche dibo

/*data.delete('test','newfile',err=>{
    

    console.log(err)

})

/*data.update('test','newfile',{name : 'india', language : 'hindi'},err=>{
    

    console.log(err)

})*/

/*data.read('test','newfile',(err,data)=>
{
    console.log(err,data);
})*/

/*data.create('test','newfile',{name : 'bangladesh', language : 'bangla'},(err)=>
{
    console.log('error was : ',err);
})*/




//configuration 
app.config = {

    port : 3000
};

//createServer
app.createServer = ()=>
{
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port,()=>
    {
       
        console.log(`listening to port ${environment.port}`)
    });

}


// handle response request

app.handleReqRes = handleReqRes;

// start the server

app.createServer();