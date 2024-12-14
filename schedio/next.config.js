const fs = require('fs');

module.exports = {
    swcMinify: true, // Enable faster minification with SWC

//     webpackDevMiddleware: (config) => {
//         const https = require('https');
//         const express = require('express');

//         const app = express();
//         const server = https.createServer(
//             {
//                 key: fs.readFileSync('./localhost-key.pem'),
//                 cert: fs.readFileSync('./localhost-cert.pem'),
//             },
//             app
//         );

//         config.server = server;

//         return config;
//     },
};
