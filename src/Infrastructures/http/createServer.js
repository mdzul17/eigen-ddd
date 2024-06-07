require("dotenv").config();
let express = require("express");
let routeApi = require("./../../Interfaces/http/api/api");
let bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
const specs = require('./swaggerConfig')
const DomainErrorTranslator = require("../../Commons/exceptions/DomainErrorTranslator")
const ClientError = require("../../Commons/exceptions/ClientError")

const createServer = async () => {
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/api/v1", routeApi);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.use((err, req, res, next) => {
        const translatedError = DomainErrorTranslator.translate(err);
      
        if (translatedError instanceof ClientError) {
          return res.status(translatedError.statusCode).json({
            status: 'fail',
            message: translatedError.message,
          });
        }
      
        // Handle server errors
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      });

    return app
}

module.exports = createServer;