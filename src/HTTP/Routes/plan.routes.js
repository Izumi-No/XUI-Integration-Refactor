"use strict";
exports.__esModule = true;
exports.planRouter = void 0;
var expressRoute_adapter_1 = require("~/Adapters/expressRoute.adapter");
var controllerFactories = require("~/Factories/Controllers/Plans");
var express_1 = require("express");
var planRouter = (0, express_1.Router)();
exports.planRouter = planRouter;
planRouter.get('/', (0, expressRoute_adapter_1.expressRouteAdapter)(controllerFactories.ListPlansControllerFactory()));
