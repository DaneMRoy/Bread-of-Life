// const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// the code below shows the creation of the distribution schema 
// this wil allow full crud options , and to have the list more dynamic
let distSchema = new Schema({
    type: {                   // this field will save the type of service that center is hosting
      type: String
    },
    location: {
      type: String          
    },
    date: {
      type: Date
    },
    distID: {
      type: Number
      
    }
  }, {
    collection: 'dist'
});

module.exports = mongoose.model('dist', distSchema)

//versionKey: false 

