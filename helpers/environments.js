/*
 * Title: Environments
 * Description: Handle All Environments 
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies 

const { twilio } = require('./environments');

//module scaffolding

const environments = {

}

//staging
environments.staging={
    port : 3000,
    envName : 'staging',
    secretKey : '324234rkasmdkdmfaksdfkads',
    maxChecks : 5,
    twilio : {

      fromPhone : '+19419607584',
      accountSid:'ACbf63b936c5c0476a696d5efa03fe1e7c',
      authToken : 'c23795bfa011f48ae65d7a13fc619b99',

 },
}

environments.productions = 
{
    port : 5000,
    envName : 'production',
    secretKey : '3ll45l345rkasmdkdmfaksdfkads',
    maxChecks : 5,
    twilio : {

      fromPhone : '+15005550006',
      accountSid:'ACbf63b936c5c0476a696d5efa03fe1e7c',
      authToken : 'c23795bfa011f48ae65d7a13fc619b99',

 },

}


// detetermine which environment was passed

const currentEnvironments = 
  typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 
  'staging';

const environmentToExport = 
  typeof environments[currentEnvironments]==='object'?
  environments[currentEnvironments] :
  environments.staging;





module.exports = environmentToExport;