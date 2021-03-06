//UI -> routes -> controllers -> models

const express = require('express');
const serverConfig = require('./configs/server.config');
const app = express();

app.listen(serverConfig.PORT, () => {
    console.log(`application started on : ${serverConfig.PORT}`); //backtick helps in using variables
})
