const log = require("ringo/logging").getLogger(module.id);
const controller = require("./controller");

const {Application} = require("stick");

const app = exports.app = new Application();

app.configure("cors", "params", "route");

app.cors({
    allowOrigin: "*",
    allowCredentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["accept", "content-type"],
});


app.get("/", request => {
    return controller.getHelloWorld(request);
})
