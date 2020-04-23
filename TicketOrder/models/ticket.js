const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Ticket collection and schema
let Ticket = new Schema(
  {
    name: {
        type: String
    },
    available : {
        type: Boolean
    },
    price : {
        type: Number
    },
  },
  {
    collection: 'tickets'
  }
);

module.exports = mongoose.model('Ticket', Ticket);
