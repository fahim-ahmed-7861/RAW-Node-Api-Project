/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/21/2020
 *
 */

// dependencies


// module scaffolding
const crypto = require('crypto')
const utilities = {};

const environments = require('./environments')

//parse json string to object

utilities.parseJson = (jsonString)=>
{
    let output;

    try{
            output = JSON.parse(jsonString);
    }
    catch
    {
        output={};
    }

    return output;


}

//hash string

utilities.hash = (str)=>
{
    if(typeof(str)==='string' && str.length>0)
    {
        let hash = crypto.createHmac("sha256",environments.secretKey)
        .update(str)
        .digest("hex");

        return hash;
    }
   else return false;


}



// export module
module.exports = utilities;