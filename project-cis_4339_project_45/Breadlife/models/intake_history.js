const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// this is the mongoose schema for the intake history we created this to be able to track the history 


let IntakeHistorySchema = new Schema({

    _id: { 
        type: String, 
        default: uuid.v1 
      },

    intakeID: {
        type: Number,
        required: true
    },

    distID: {
        type: Number,
        required: true
    },

    type: {
        type: String
    },

    date: {
        type: Date
    }
}, {
    collection: 'intake_history'
});

module.exports = mongoose.model('intake_history', IntakeHistorySchema)