const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// the code below allows the schema to be made, the schema was made based on the intake form example we wanted to 
// have away of saving all the reponses into the database from the intake form 
let intakeSchema = new Schema({
    //_id: Number,
    _id: { 
      type: String, 
      default: uuid.v1 
    },
    
    firstName: {
      type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
      type: Number
    },
    how_did_you_hear: {
      type: String
    },
    zipCode: {
      type: Number
    },
    would_you_like_vaccine: {
      type: String
    },
    which_covid_vaccine: {
      type: String
    },
    have_you_received_vaccine: {
      type: String
    },
    support_services: {
      type: String
    },
    number_of_children: {
      type: String
    },
    anyone_65: {
      type: String
    },
    veteran: {
      type: String
    },
    race: {
      type: String
    },
    
    intakeID: {
      type: Number,
      required: true
    }

 
  
  }, {
    collection: 'intake'
});


module.exports = mongoose.model('intake', intakeSchema)

//versionKey: false 



