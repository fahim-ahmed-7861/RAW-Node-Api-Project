/*
 * Title: Uptime Monitoring Routes
 * Description: Route handler user related info
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies

const data =require('../../lib/data.js')
const { parseJson } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');


const {hash} = require('../../helpers/utilities')

// module scaffolding

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptMethods = ["get", "post", "put", "delete"];

  if (acceptMethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else callback(405);
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {

  

  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

      console.log(typeof (requestProperties.body.tosAgreement))

if (firstName && lastName && phone && password && tosAgreement) {

    

    data.read('user',phone,(err1)=>
    {
        if(err1)
        {
            const userObject = {
                firstName,
                lastName,
                phone,
                password: hash(password),
                tosAgreement,
            };

            data.create('users',phone,userObject,(err2)=>
            {
                console.log(userObject)
                if(!err2)
                {
                    callback(200,
                        {
                            message:'user was created successfully',
                        })
                }
                else{

                    callback(500,
                        {
                            message:err2,
                        })

                }
            })
        }
        else{

            callback(500,{
                error : 'There is a server side problem',
            })
        }
    })
          

          }
        
    else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._user.get = (requestProperties, callback) => {

      // check the phone number if valid
      const phone =
      typeof requestProperties.queryStringObject.phone === 'string' &&
      requestProperties.queryStringObject.phone.trim().length === 11
          ? requestProperties.queryStringObject.phone
          : false;
          if (phone) {
            // verify token
            const token =
                typeof requestProperties.headersObject.token === 'string'
                    ? requestProperties.headersObject.token
                    : false;
    
            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    // lookup the user
                    data.read('users', phone, (err, u) => {
                        const user = { ...parseJson(u) };
                        if (!err && user) {
                            delete user.password;
                            callback(200, user);
                        } else {
                            callback(404, {
                                error: 'Requested user was not found!',
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'Authentication failure!',
                    });
                }
            });
        } else {
            callback(404, {
                error: 'Requested user was not found!',
            });
        }

};
// @TODO: Authentication
handler._user.put = (requestProperties, callback) => {
   // check the phone number if valid
   const phone =
   typeof requestProperties.body.phone === 'string' &&
   requestProperties.body.phone.trim().length === 11
       ? requestProperties.body.phone
       : false;

const firstName =
   typeof requestProperties.body.firstName === 'string' &&
   requestProperties.body.firstName.trim().length > 0
       ? requestProperties.body.firstName
       : false;

const lastName =
   typeof requestProperties.body.lastName === 'string' &&
   requestProperties.body.lastName.trim().length > 0
       ? requestProperties.body.lastName
       : false;

const password =
   typeof requestProperties.body.password === 'string' &&
   requestProperties.body.password.trim().length > 0
       ? requestProperties.body.password
       : false;

if (phone) {
   if (firstName || lastName || password) {
       // verify token
       const token =
           typeof requestProperties.headersObject.token === 'string'
               ? requestProperties.headersObject.token
               : false;

       tokenHandler._token.verify(token, phone, (tokenId) => {
           if (tokenId) {
               // loopkup the user
               data.read('users', phone, (err1, uData) => {
                   const userData = { ...parseJson(uData) };

                   if (!err1 && userData) {
                       if (firstName) {
                           userData.firstName = firstName;
                       }
                       if (lastName) {
                           userData.firstName = firstName;
                       }
                       if (password) {
                           userData.password = hash(password);
                       }

                       // store to database
                       data.update('users', phone, userData, (err2) => {
                           if (!err2) {
                               callback(200, {
                                   message: 'User was updated successfully!',
                               });
                           } else {
                               callback(500, {
                                   error: 'There was a problem in the server side!',
                               });
                           }
                       });
                   } else {
                       callback(400, {
                           error: 'You have a problem in your request!',
                       });
                   }
               });
           } else {
               callback(403, {
                   error: 'Authentication failure!',
               });
           }
       });
   } else {
       callback(400, {
           error: 'You have a problem in your request!',
       });
   }
} else {
   callback(400, {
       error: 'Invalid phone number. Please try again!',
   });
}
};

// @TODO: Authentication
handler._user.delete = (requestProperties, callback) => {
   // check the phone number if valid
   const phone =
   typeof requestProperties.queryStringObject.phone === 'string' &&
   requestProperties.queryStringObject.phone.trim().length === 11
       ? requestProperties.queryStringObject.phone
       : false;

if (phone) {
   // verify token
   const token =
       typeof requestProperties.headersObject.token === 'string'
           ? requestProperties.headersObject.token
           : false;

   tokenHandler._token.verify(token, phone, (tokenId) => {
       if (tokenId) {
           // lookup the user
           data.read('users', phone, (err1, userData) => {
               if (!err1 && userData) {
                   data.delete('users', phone, (err2) => {
                       if (!err2) {
                           callback(200, {
                               message: 'User was successfully deleted!',
                           });
                       } else {
                           callback(500, {
                               error: 'There was a server side error!',
                           });
                       }
                   });
               } else {
                   callback(500, {
                       error: 'There was a server side error!',
                   });
               }
           });
       } else {
           callback(403, {
               error: 'Authentication failure!',
           });
       }
   });
} else {
   callback(400, {
       error: 'There was a problem in your request!',
   });
}
};

module.exports = handler;
