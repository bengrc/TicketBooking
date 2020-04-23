const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define  Transaction collection and schema
let Transaction = new Schema(
  {
    orderId: {
        type: String
    },
    userId : {
        type: String
    },
    ticketsBookedIds : {
        type: [String]
    },
    totalPrice : {
        type: Number
    }
  },
  {
    collection: 'transactions'
  }
);

module.exports = mongoose.model('Transaction', Transaction);
