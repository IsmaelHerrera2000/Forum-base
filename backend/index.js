const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Forum API',
      version: '1.0.0',
      description: 'API para gestionar usuarios en un foro',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
