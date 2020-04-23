const express = require('express');
const app = express();
const transactionRoute = express.Router();

// Transaction model
let Transaction = require('../models/transaction');

// Add Transaction
transactionRoute.route('/transaction/create').post((req, res, next) => {
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
transactionRoute.route('/transactions').get((req, res) => {
    Transaction.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get single transaction
transactionRoute.route('/transaction/:id').get((req, res) => {
    Transaction.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update transaction
transactionRoute.route('/transaction/:id').put((req, res, next) => {
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
transactionRoute.route('/transaction/delete/:id').delete((req, res, next) => {
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
