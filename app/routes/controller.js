const log = require("ringo/logging").getLogger(module.id);
const response = require("ringo/jsgi/response");
const store = require("../model/store");

exports.getHelloWorld = (request) => {
    return response.json({
        hello: "world",
    });
};
