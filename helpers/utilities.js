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

   // console.log('jsonString : ',jsonString);

    try{
            output = JSON.parse(jsonString);
    }
    catch
    {
        output={};
    }
   // console.log('output : ',output);

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

// create random string

utilities.createRandomString=(strlength)=>
{ let length = strlength;
    length = typeof strlength === 'number' && strlength > 0 ? strlength : false;

    if (length) {
        const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for (let i = 1; i <= length; i += 1) {
            const randomCharacter = possiblecharacters.charAt(
                Math.floor(Math.random() * possiblecharacters.length)
            );
            output += randomCharacter;
        }
        return output;
    }
    return false;
}



// export module
module.exports = utilities;