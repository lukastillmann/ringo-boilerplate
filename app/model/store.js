const { Store, Cache  } = require("ringo-sqlstore");
const config = require("../config");
const log = require("ringo/logging").getLogger(module.id);

const connectionPool = module.singleton("connectionPool", function() {
    let props = config.get("db");
    log.info("Instantiation connection pool:", props.user + "@" + props.url);
    return Store.initConnectionPool(props);
})

const entityCache = module.singleton("entityCache", function() {
    let size = config.get("cache:entities");
    if (size > 0) {
        log.info("Sqlstore entity cache size: {}", size);
        return new Cache(size);
    }
    log.info("disabled sqlstore entity cach");
    return null;
})

const queryCache = module.singleton("queryCache", function() {
    let size = config.get("cache:queries") || 1000;
    log.info("Sqlstore query cache size: {}", size);
    return new Cache(size);
})

const store = module.exports = new Store(connectionPool);
store.setEntityCache(entityCache);
store.setQueryCache(queryCache);
store.registerEntityModule(module.resolve("./all"));
