const express = require('express');
const app = express();
const userRoute = express.Router();

// user model
let User = require('../models/userModel');


// Add User

// Routes
/**
 * @swagger
 * /create:
 *  post:
 *   description: Use to create a new user
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: user
 *      description: The user to create.
 *      schema:
 *        type: object
 *        required:
 *          - username
 *        properties:
 *         username:
 *          type: string
 *   responses:
 *    '200':
 *      description: New user successfuly created
 */
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log('User successfully added!');
    }
  });
});


// Delete User

// Routes
/**
 * @swagger
 * /delete:
 *  delete:
 *   description: Use to delete an existing user
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The user id of the user to delete.
 *      type: string
 *      required: true
 *   responses:
 *    '200':
 *      description: User successfuly deleted
 */
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

// Get all student

// Routes
/**
 * @swagger
 * /users:
 *  get:
 *   description: Use to get all the existing users
 *   produces:
 *    - application/json
 *   responses:
 *    '200':
 *      description: All users successfuly retrieved
 */
userRoute.route('/users').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single User

// Routes
/**
 * @swagger
 * /user/:id:
 *  get:
 *   description: Use to get a specific user
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The user id of the user to retrieve.
 *      type: string
 *      required: true
 *   responses:
 *    '200':
 *      description: User successfuly retrieved
 */
userRoute.route('/user/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update User

// Routes
/**
 * @swagger
 * /user/:id:
 *  put:
 *   description: Use to modify an existing user
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The user id of the user to modify.
 *      type: string
 *      required: true
 *    - in: body
 *      name: username
 *      schema:
 *        type: object
 *        required:
 *          - username
 *        properties:
 *         username:
 *          type: string
 *   responses:
 *    '200':
 *      description: User successfuly updated
 */
userRoute.route('/user/:id').put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log('User successfully updated!');
      }
    }
  );
});


module.exports = userRoute;