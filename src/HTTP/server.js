"use strict";
exports.__esModule = true;
exports.run = void 0;
var configs_1 = require("~/configs");
var app_1 = require("./app");
var PORT = configs_1.configs.port || 3000;
function run() {
    app_1.app.listen(PORT, function () { return console.log(PORT); });
}
exports.run = run;
