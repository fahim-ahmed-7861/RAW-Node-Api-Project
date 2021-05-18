/*
 * Title: Environments
 * Description: Handle All Environments 
 * Author: Fahim Ahmed Shojib
 * Date: 11/15/2020
 *
 */

// dependencies 

//module scaffolding

const environments = {

}

//staging
environments.staging={
    port : 3000,
    envName : 'staging',
    secretKey : '324234rkasmdkdmfaksdfkads',
    maxChecks : 5,
}

environments.productions = 
{
    port : 5000,
    envName : 'production',
    secretKey : '3ll45l345rkasmdkdmfaksdfkads',
    maxChecks : 5,
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