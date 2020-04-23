const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Transaction = new Schema(
  {
    student_name: {
      type: String
    },
    student_email: {
      type: String
    },
    section: {
      type: String
    },
    subjects: {
      type: Array
    },
    gender: {
      type: String
    },
    dob: {
      type: Date
    }
  },
  {
    collection: 'transactions'
  }
);

module.exports = mongoose.model('Transaction', Transaction);
