import 'reflect-metadata';
import 'module-alias/register';
import express from "express";
// // Do not think I have to do this amy more, the below thing body-parser
import bodyParser from "body-parser";

import Container from 'typedi';
import {ENV_CONFIG} from '../app/config';
import {Logger} from '../libs/logs/logger';

// https://www.npmjs.com/package/routing-controllers
import {useExpressServer, useContainer as routingContainer} from 'routing-controllers';
import http from 'http';

const baseDir = __dirname;
const expressApp = express();
console.log('here', baseDir)
// Handling the DependencyInjection across the entire application
routingContainer(Container);

// Loads all the controllers from teh directories and provides the routing facility
console.log('ENV_CONFIG', ENV_CONFIG.app.apiRoot)
console.log('controllers', [baseDir + `/**/controllers/*{.js,.ts}`])
useExpressServer(expressApp, {
  routePrefix: ENV_CONFIG.app.apiRoot,
  defaultErrorHandler: false,
  controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});

// Again, I do not thing I have to use this
expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());

const server = http.createServer(expressApp);
server.listen(ENV_CONFIG.app.port, () => {
  console.log('am I here now');
  Logger.info('Server', 'Application running on', `${ENV_CONFIG.app.hostname}:${ENV_CONFIG.app.port}`);
});

// Handing the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
  Logger.error('Server', 'unhandledRejectionError :', `${error}`);
});
