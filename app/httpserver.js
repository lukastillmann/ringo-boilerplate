const httpServer = require("httpserver");
const log = require("ringo/logging").getLogger(module.id);
const fs = require("fs");
const config = require("./config");

module.exports = module.singleton("httpServer", function() {
    let jettyXmlPath = fs.absolute(module.resolve("config/jetty.xml"));
    if (!fs.exists(jettyXmlPath)) {
        log.warn("no jetty.xml file found in {}, using default", jettyXmlPath);
        jettyXmlPath = null;
    } else {
        log.info("using {} as base configuration", jettyXmlPath);
    }
    return httpServer
        .build(jettyXmlPath)
        .serveApplication("/", module.resolve("./routes"))
        .http({
            host: config.get("host"),
            port: config.get("port"),
            sessions: true
        }).server
});
