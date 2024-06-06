require("dotenv").config();
let express = require("express");
let routeApi = require("./../../Interfaces/http/api/api");
let bodyParser = require("body-parser");
const cors = require("cors");

const createServer = async () => {
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/api/v1", routeApi);

    return app
}

module.exports = createServer;