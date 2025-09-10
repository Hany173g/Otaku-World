const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()
const path = require('path')
const app = express();
const axios = require('axios');

//Server Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// paths


app.use(express.static(path.join(__dirname,'uploads')))


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

// Lightweight image proxy to stream external images without storing
app.get('/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) {
      return res.status(400).json({ message: 'Invalid or missing url parameter' });
    }

    const upstream = await axios.get(imageUrl, {
      responseType: 'stream',
      headers: {
        // Spoof a browser user-agent to avoid basic bot blocks
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': imageUrl,
      },
      // reasonable timeout
      timeout: 10000,
      // follow redirects by default
      maxRedirects: 5,
      validateStatus: status => status >= 200 && status < 400,
    });

    const contentType = upstream.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    if (upstream.headers['cache-control']) {
      res.setHeader('Cache-Control', upstream.headers['cache-control']);
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }

    upstream.data.on('error', () => {
      res.status(502).end();
    });

    upstream.data.pipe(res);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch image' });
  }
});
app.listen(PORT, () => {
    console.log("Server Is Start")
    console.log(`Swagger Documentation: http://localhost:${PORT}/api-docs`)
})









