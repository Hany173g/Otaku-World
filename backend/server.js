const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()

const app = express();

//Server Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Otaku World API',
      version: '1.0.0',
      description: 'API documentation for Otaku World backend authentication system',
      contact: {
        name: 'API Support',
        email: 'support@otakuworld.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controller/*.js'] // مسارات الملفات التي تحتوي على التوثيق
};

const specs = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Otaku World API Documentation'
}));

// Dotenv Variables
const PORT = process.env.PORT;

//Routes
let signupRoute = require('./routes/authRoute')
let profileRoute = require('./routes/profileRoute')
let homeRoute = require('./routes/homeRoute')
let dashboardRoute = require('./routes/dashboardRoute')
let episodeRoute = require('./routes/episodeRoute')
let sessionRoute = require('./routes/sessionRoute')


app.use('/api/auth', signupRoute)
app.use('/api/dashboard',dashboardRoute)
app.use('/profile',profileRoute)
app.use('/home',homeRoute)
app.use('/api/episode',episodeRoute)
app.use('/api',sessionRoute)
app.listen(PORT, () => {
    console.log("Server Is Start")
    console.log(`Swagger Documentation: http://localhost:${PORT}/api-docs`)
})









