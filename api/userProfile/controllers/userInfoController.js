"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const userApiInfo_1 = require("../userApiInfo");
const logger_1 = require("../../../libs/logs/logger");
const userInfoSvc_1 = require("../services/userInfoSvc");
let UserInfoController = class UserInfoController {
    constructor(_userInfoSvc) {
        this._userInfoSvc = _userInfoSvc;
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('here in GET YO');
            try {
                const resp = yield this._userInfoSvc.userInfoExecuter();
                logger_1.Logger.info('Controller: getUserInfo', 'response:' + JSON.stringify(resp));
                return Promise.resolve(resp);
            }
            catch (error) {
                logger_1.Logger.error('Controller: getUserInfo', 'errorInfo:', JSON.stringify(error));
                return Promise.reject(error);
            }
        });
    }
    getUserInfoById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this._userInfoSvc.userInfoExecuterById(userId);
                logger_1.Logger.info('Controller: getUserInfoById', 'response:' + JSON.stringify(resp));
                return Promise.resolve(resp);
            }
            catch (error) {
                logger_1.Logger.error('Controller: getUserInfoById', 'errorInfo:' + JSON.stringify(error));
                return Promise.reject(error);
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/getUserInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "getUserInfo", null);
__decorate([
    (0, routing_controllers_1.Get)('/getUserInfoById'),
    __param(0, (0, routing_controllers_1.QueryParam)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "getUserInfoById", null);
UserInfoController = __decorate([
    (0, routing_controllers_1.JsonController)(userApiInfo_1.URL_INFO.contextPath + '/userInfo'),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [userInfoSvc_1.userInfoSvc])
], UserInfoController);
exports.UserInfoController = UserInfoController;
