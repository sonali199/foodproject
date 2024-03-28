const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const { handleServerError, handleNotFoundError, handleValidationError } = require('./middleware/errorHandling');
const pricingRoutes = require('./routes/pricingRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON body
app.use(bodyParser.json());

// Serve Swagger UI documentation
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes
app.use('/pricing', pricingRoutes);

// Error handling middleware
app.use(handleValidationError);
app.use(handleNotFoundError);
app.use(handleServerError);

// Start the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});