//Dependencies

const fs = require('fs');
const path = require('path');


const lib={

}
//base directory of data folder 
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file 

lib.create = (dir,file,data,callback)=>
{
    //open file for writing

    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor)=>
    {
        console.log('open hit',err)
        if(!err && fileDescriptor)
        {
            const stringData = JSON.stringify(data);

            //write data to file and close it

            fs.writeFile(fileDescriptor,stringData,(err2)=>
            {
                if(!err2)
                {
                    fs.close(fileDescriptor,(err3)=>
                    {
                        if(!err3)
                        {
                            callback(false);
                        }
                        else{
                            callback('error closin to new file')
                        }
                    })
                }
                else
                {
                    callback('error writng to new file')
                }
            })
        }
        else{
            callback('There is a error, file may already exist')
        }
    })
}


// read data to file

lib.read = (dir,file,callback)=>
{
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
}

// update existing file

lib.update=(dir,file,data,callback)=>
{
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {

        if(!err && fileDescriptor)
      {
           const stringData = JSON.stringify(data);

           fs.ftruncate(fileDescriptor,(err1)=>
           {
              if(!err1)
              {
                    fs.writeFile(fileDescriptor,stringData,err2=>
                        {
                            if(!err2)
                            {
                                fs.close(fileDescriptor,err3=>
                                    {
                                        if(!err3)
                                        {
                                            callback(false)

                                        }
                                        else{
                                            callback('error to file close');
                                        }
                                    })
                            }
                            else{
                                callback('error to writing file')
                            }
                        })
              }
              else{
                  callback('error truncating to file')
              }

           })
      }
      else{
          callback('error updating file may not exist')
      }
    })
}

// delete existing file 

lib.delete = (dir,file,callback)=>
{
   //unlink file

   fs.unlink(`${lib.basedir + dir}/${file}.json`,err=>
   {
     if(!err)callback(false);

     else callback('error to delete the file')
   })
}

// List all the items in a directory
// list all the items in a directory
lib.list = (dir, callback) => {
    fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
        if (!err && fileNames && fileNames.length > 0) {
            const trimmedFileNames = [];
            fileNames.forEach((fileName) => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);
        } else {
            callback('Error reading directory!');
        }
    });
};


module.exports = lib;