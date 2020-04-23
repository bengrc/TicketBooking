const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Order collection and schema
let Order = new Schema(
  {
    userId: {
        type: String
    },
    ticketsBooked : {
        type: [{
            name: {
                type: String
            },
            available : {
                type: Boolean
            },
            price : {
                type: Number
            }
        }]
    },
    payment : {
        type: Boolean
    },
  },
  {
    collection: 'orders'
  }
);

module.exports = mongoose.model('Order', Order);
