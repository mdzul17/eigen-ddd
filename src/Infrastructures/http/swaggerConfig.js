const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs for Eigen Test App',
      version: '1.0.0',
      description: 'This is REST API Documentation for Eigen Test App',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/Interfaces/http/api/*/route.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
