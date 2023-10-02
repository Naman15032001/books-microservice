const express = require('express');
const expressHttpProxy = require('express-http-proxy');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
 
const content_service_url = 'http://content-service:8001' + '/api/v1/content';
const user_service_url = 'http://user-service:8003' + '/api/v1/user';
const interaction_service_url = 'http://interaction-service:8002' + '/api/v1/interaction';

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per window
  message: 'Rate limit exceeded. Please try again later.',
});

//logging middleware
app.use(morgan('combined')); 

// CORS middleware
app.use(cors());

// Helmet middleware for security headers
app.use(helmet());

// Middleware to proxy requests to content service
app.use(
  '/api/v1/content',
  apiLimiter,
  expressHttpProxy(content_service_url, {
    proxyReqPathResolver: (req) => {
      // Use the full URL path for the target
      const target_url = content_service_url + req.url;
      return target_url;
    },
  })
);

// Middleware to proxy requests to the User Service 
app.use(
  '/api/v1/user',
  apiLimiter,
  expressHttpProxy(user_service_url, {
    proxyReqPathResolver: (req) => {
      const target_url = user_service_url + req.url;
      return target_url;
    },
  })
);

// Middleware to proxy requests to the Interaction Service
app.use(
  '/api/v1/interaction',
  apiLimiter,
  expressHttpProxy(interaction_service_url, {
    proxyReqPathResolver: (req) => {
      const target_url = interaction_service_url + req.url;
      return target_url;
    },
  })
);

const port = 8000; // Port for the API Gateway
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});

