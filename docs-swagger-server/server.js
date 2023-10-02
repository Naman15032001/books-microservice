const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Load your Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

const app = express();
const port = process.env.PORT || 3000;

// Serve Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
