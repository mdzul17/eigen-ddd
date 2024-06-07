require("dotenv").config();
let express = require("express");
let routeApi = require("./../../Interfaces/http/api/api");
let bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
const specs = require('./swaggerConfig')

const createServer = async () => {
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/api/v1", routeApi);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    return app
}

module.exports = createServer;