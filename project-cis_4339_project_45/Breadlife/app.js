const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");  // Require mongoose library
//Adding better logging functionality
const morgan = require("morgan");

require("dotenv").config();   // Require the dotenv

const app = express();  //Create new instance


// import the intake model schema from another file
let IntakeModel = require('./models/intake');

// distrubution model
let DistModel = require('./models/dist');

// intake_history model
let IntakeHistoryModel = require('./models/intake_history');

// setting up mongoose DB connection, this code takes the .env file to make a connection with mongoDB database
mongoose
  .connect(process.env.MONGO_URL)   // read environment varibale from .env
  .then(() => {
    console.log("Database connection Success!"); // if the connection is made this will allow a message to show
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = process.env.PORT || 3000; //Declare the port number
app.use(cors());
app.use(express.json()); 
app.use(morgan("dev"));  
 //the code below lets the jsonto display all of the intake forms 
app.get('/intakes', (req, res, next) => {
  
    IntakeModel.find((error, data) => {
        if (error) {
         
          return next(error)
        } else {
          res.json(data)
        }
      })
});

//delete a intake by id, it allows the id number to be passeed through as the url to complete the delete function
app.delete('/intake/:id', (req, res, next) => {
   
    IntakeModel.findOneAndRemove({ intakeID: req.params.id}, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.send('Intake is deleted'); //allows a deleted message to be displayed
        }
      });
});

// endpoint that will create a intake 
app.post('/intake', (req, res, next) => {

    IntakeModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
           
          res.send('Intake is added to the database');
        }
    });
});

// endpoint for retrieving intake by intakeID
app.get('/intake/:id', (req, res, next) => {
   

    IntakeModel.findOne({ intakeID: req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else if (data === null) {
            // Sending 404 when not found something is a good practice
          res.status(404).send('Intake not found');
        }
        else {
          res.json(data)
        }
    });
});
// The code below is for the reporting of the did you want the vaccine report
app.get('/vaccine_report', (req, res, next) => {
  
  IntakeModel.aggregate( [{"$group":{"_id":null,"count":{"$sum":1},"data":{"$push":"$$ROOT"}}},
  {"$unwind":"$data"},
   {"$group":{"_id":{"have_you_received_vaccine":"$data.have_you_received_vaccine"},"count":{"$sum":1},
             "total":{"$first":"$count"}}},
   {"$project":{"count":1,"percentage":{"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});
// The code below is for the reporting of the how did you hear about us report
app.get('/hear_report', (req, res, next) => {
  IntakeModel.aggregate( [{"$group":{"_id":null,"count":{"$sum":1},"data":{"$push":"$$ROOT"}}},
  {"$unwind":"$data"},
   {"$group":{"_id":{"how_did_you_hear":"$data.how_did_you_hear"},"count":{"$sum":1},
             "total":{"$first":"$count"}}},
   {"$project":{"count":1,"percentage":{"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});
// The code below is for the reporting of the how did you hear about us report
app.get('/race_report', (req, res, next) => {
 
  IntakeModel.aggregate( [{"$group":{"_id":null,"count":{"$sum":1},"data":{"$push":"$$ROOT"}}},
  {"$unwind":"$data"},
   {"$group":{"_id":{"race":"$data.race"},"count":{"$sum":1},
             "total":{"$first":"$count"}}},
   {"$project":{"count":1,"percentage":{"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

// endpoint to group and count the intake history
app.get('/intake_history_report/:intakeID', (req, res, next) => {
  IntakeHistoryModel.aggregate([
    { $match : { intakeID : Number(req.params.intakeID) } },   
    {$group:{_id:{"type":"$type","intakeID":"$intakeID"},"count":{$sum:1}}},
    {$project:{"total":"$count"}}
    ], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

// Updating - editing a intake - we want to use PUT
app.put('/intake/:id', (req, res, next) => {
    IntakeModel.findOneAndUpdate({ intakeID: req.params.id }, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.send('Intake is edited via PUT');
          console.log('Intake successfully updated!', data)
        }
      })
});

// endpoint that will create a distrubition 
app.post('/dist', (req, res, next) => {
    DistModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          // res.json(data)
          res.send('Distribution has been added to the database');
        }
    });
});

// endpoint that will get distribution by distID
app.get('/dist-get/:id', (req, res, next) => {
    DistModel.find({ distID: req.params.id }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
});

// Updating - editing a dist - we want to use PUT
app.put('/dist/:id', (req, res, next) => {
  DistModel.findOneAndUpdate({ distID: req.params.id }, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send('Distribution is edited via PUT');
        console.log('Distribution successfully updated!', data)
      }
    })
});

//delete a distribution by id
app.delete('/dist/:id', (req, res, next) => {
   
  DistModel.findOneAndRemove({ distID: req.params.id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
         
        res.send(' Distrubution is deleted');
      }
    });
});


//create an endpoint to get all dist from the API
app.get('/dists', (req, res, next) => {
 
  DistModel.find((error, data) => {
      if (error) {
        
        return next(error)
      } else {
        res.json(data)
      }
    })
});

// end point to list only 3 recent distrubution locations
app.get('/dists_3', (req, res, next) => {
  
  DistModel.aggregate( [
    { $sort: { date: -1 } },
    { $limit: 3 },], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});


//The code below takes the IntakeModel and passes a aggregate statement to find the ID by the phonenumber on the intake form
app.get('/find_id_phone/:phoneNumber', (req, res, next) => {
  
  IntakeModel.aggregate([
    {$match: {phoneNumber: Number(req.params.phoneNumber) } }], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

// intake_history collection

// endpoint that retrieves all records form the intake_history collection
app.get('/getall_ih', (req, res, next) => {
  IntakeHistoryModel.find((error, data) => {
      if (error) {
        return next(error)                    // returns error message
      } else {
        res.json(data)                  // returns all records form the collection in json
      }
    })
});


// endpoint that creates a record in the intake_history collection
app.post('/post_ih', (req, res, next) => {
  IntakeHistoryModel.create(req.body, (error, data) => {        // users inputs data in json format to be added to the collection
      if (error) {
        return next(error)                                    // returns error message
      } else {
        res.send('Intake History has been added to the database');
      }
  });
});

// endpoint that deletes a record from the intake_collection by id
app.delete('/del_ih/:id', (req, res, next) => {
  IntakeHistoryModel.findOneAndRemove({ _id: req.params.id}, (error, data) => {    // finds the record with the id form the url and deletes it
      if (error) {
        return next(error);               // returns error message
      } else {
         
        res.send('Intake History record has been deleted.');
      }
    });
});

// endpoint that updates a record in the intake_collection by id
app.put('/update_ih/:id', (req, res, next) => {
  IntakeHistoryModel.findOneAndUpdate({ _id: req.params.id }, {    // takes the id from the url and allows the user to update the record
      $set: req.body                                                    // users inputted updates
    }, (error, data) => {
      if (error) {
        return next(error);                   // returns error message
      } else {
        res.send('Intake History record has been updated');
        console.log('Intake History successfully updated!', data)
      }
    })
});

app.get('/ih_by_intakeid/:id', (req, res, next) => {
  IntakeHistoryModel.find({ intakeID: req.params.id }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

app.get('/ih_by_id/:id', (req, res, next) => {
  IntakeHistoryModel.find({ _id: req.params.id }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});


// endpoint that take the distID and matches all records in the intake_history collection
// allows the supervisor to see how many people were served at each distribution event
app.get('/get_ih_by_distid/:distID', (req, res, next) => {
  IntakeHistoryModel.aggregate([
    {$match: {distID: Number(req.params.distID) } },          // takes the distID from the url and uses it to match all records
    {$group: {_id:{"distID":"$distID"},"count":{$sum:1}}},    // counts the total number of records that match the distID
    {$project: {"total:":"$count"}}
  ], (error, data) => {
    if (error) {
      return next(error)                             // returns error message
    } else {
      res.json(data);                               // returns the aggregate data in json 
    }
  })
});

app.listen (3000,PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});