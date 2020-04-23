const express = require('express');
const app = express();
const transactionRoute = express.Router();

// Transaction model
let Transaction = require('../models/transaction');

// Add Transaction
transactionRoute.route('/add-student').post((req, res, next) => {
    Transaction.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Transaction successfully added!');
        }
    });
});

// Get all transactions
transactionRoute.route('/').get((req, res) => {
    Transaction.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get single student
transactionRoute.route('/read-student/:id').get((req, res) => {
    Transaction.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update student
transactionRoute.route('/update-student/:id').put((req, res, next) => {
    Transaction.findByIdAndUpdate(req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Transaction successfully updated!');
        }
    }
  );
});

// Delete Transaction
transactionRoute.route('/delete-student/:id').delete((req, res, next) => {
    Transaction.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
        return next(error);
    } else {
        res.status(200).json({
        msg: data
        });
    }
  });
});

module.exports = transactionRoute;
