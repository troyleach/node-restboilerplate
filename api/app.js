"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
// // Do not think I have to do this amy more, the below thing body-parser
const body_parser_1 = __importDefault(require("body-parser"));
const typedi_1 = __importDefault(require("typedi"));
const config_1 = require("../app/config");
const logger_1 = require("../libs/logs/logger");
const routing_controllers_1 = require("routing-controllers");
const http_1 = __importDefault(require("http"));
const baseDir = __dirname;
const expressApp = (0, express_1.default)();
console.log('here', baseDir);
// Handling the DependencyInjection across the entire application
(0, routing_controllers_1.useContainer)(typedi_1.default);
// Loads all the controllers from teh directories and provides the routing facility
console.log('ENV_CONFIG', config_1.ENV_CONFIG.app.apiRoot);
console.log('controllers', [baseDir + `/**/controllers/*{.js,.ts`]);
(0, routing_controllers_1.useExpressServer)(expressApp, {
    routePrefix: config_1.ENV_CONFIG.app.apiRoot,
    defaultErrorHandler: false,
    controllers: [baseDir + `/**/controllers/*{.js,.ts`]
});
// Again, I do not thing I have to use this
expressApp.use(body_parser_1.default.urlencoded({ extended: false }));
expressApp.use(body_parser_1.default.json());
const server = http_1.default.createServer(expressApp);
server.listen(config_1.ENV_CONFIG.app.port, () => {
    console.log('am I here now');
    logger_1.Logger.info('Server', 'Application running on', `${config_1.ENV_CONFIG.app.hostname}:${config_1.ENV_CONFIG.app.port}`);
});
// Handing the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
    logger_1.Logger.error('Server', 'unhandledRejectionError :', `${error}`);
});
