const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const dataBaseConfig = require('./server/database/db');

// configuring swagger doc
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User Service API',
      description: 'User MicroService API Documentation',
      server: ['http://localhost:3000'],
    }
  },
  apis: ['server.js', './server/routes/user.route.js'],
}


// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log('Database connected successfully ');
    },
    error => {
      console.log('Could not connected to database : ' + error);
    }
  );

// Set up express js port
const userRoute = require('./server/routes/user.route');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
/* app.use(express.static(path.join(dirname, 'dist/user-service')));
app.use('/', express.static(path.join(dirname, 'dist/user-service'))); */
app.use('/', userRoute);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Create port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Server is listening to port ' + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});