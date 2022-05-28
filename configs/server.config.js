//process.env loads while starting project
if(process.env.NODE_ENV != 'production'){
    //dotenv has no dependency, picks all variables from .env files
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT
}