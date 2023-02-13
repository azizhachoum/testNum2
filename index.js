const mongoose = require("mongoose");
const express = require ("express")
const port = 4000;
const pug = require('pug')
const path = require("path")
const bodyParser = require("body-parser")

const uri = "mongodb+srv://test:test@employees.fev0eih.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.on('error', function(err){
  console.log(err)
})
db.once('open', function(){
  console.log('Connected to Mongodb')
})

// init app
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//load view engine 
app.set ('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'static')))


let employees = require("./models/employee");

//home route 
app.get('/', (req, res) => {
  db.collection('employees').find({}).toArray((err, result) => {
    if (err) throw err;
    res.render('employee', { employees: result });
  });
});
        


  // Add route
app.get("/employee/add", (req, res) => {
  res.render('create');
});

//add submit post 
app.post('/employee/add', (req, res)=>{
  let employee = new employees()
  employee.firstName = req.body.firstName
  employee.lastName = req.body.lastName
  employee.email = req.body.email
  
  employee.save(function(err){  
    if(err){
      console.log(err)
      return
    }else{
      res.redirect("/")
    }
  })
})


// Get a single employee by ID
  app.get("/employee/:id", (req, res) => {
    employees.findById(req.params.id, (err, employee) => {
      res.render('details',{employees : employee})
    });
  });


  //load Edit form
  app.get("/employee/edit/:id", (req, res) => {
    employees.findById(req.params.id, (err, employee) => {
      res.render('edit_employee',{employees : employee})
    });
  });


//update submit post 
app.post('/employee/edit/:id', (req, res)=>{
  let employee = {}
  employee.firstName = req.body.firstName
  employee.lastName = req.body.lastName
  employee.email = req.body.email
  
  let query = {_id:req.params.id}
  employees.updateOne(query, employee,function(err){  
    if(err){
      console.log(err)
      return
    }else{
      res.redirect("/")
    }
  })
})


  // Delete an existing employee
   app.delete('/employee/delete/:id', (req, res) => {
     let query = {_id:req.params.id}
     employees.remove(query, (error) => {
        if (error) {
          console.log(err);
        } else {
              res.send("Employé supprimé avec succès");
         }
       });
     })

     


  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

