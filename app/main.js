const engine = require("ringo/engine");
//const config = require("./config");
const log = require("ringo/logging").getLogger(module.id);
const store = require("./model/store");

const httpServer = require("./httpserver")

// create tables if necessary, and app is not in production mode
if (engine.getRhinoEngine().getConfig().isReloading()) {
    store.syncTables();
}

const init = (exports.init = () => {
    engine.addShutdownHook(() => {
        stop();
    })
})

const start = function () {
    log.info("Starting application");
    httpServer.start();
    engine.addShutdownHook(function() {
        stop();
    })
}

const stop = function() {
    httpServer.stop();
    httpServer.destroy();
    log.info("stopped application");
}

if (require.main === module) {
    init();
    start();
}
