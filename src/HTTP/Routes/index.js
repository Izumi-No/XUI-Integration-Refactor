"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var expressMiddleware_adapters_1 = require("~/Adapters/expressMiddleware.adapters");
var AuthMiddlewareFactory_1 = require("~/Factories/Middleware/AuthMiddlewareFactory");
var plan_routes_1 = require("./plan.routes");
var user_routes_1 = require("./user.routes");
var router = (0, express_1.Router)();
exports.router = router;
router.use((0, expressMiddleware_adapters_1.adaptMiddleware)((0, AuthMiddlewareFactory_1.AuthMiddlewareFactory)()));
router.use('/users', user_routes_1.userRouter);
router.use('/plans', plan_routes_1.planRouter);
