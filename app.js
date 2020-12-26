const express= require("express");
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_page', {useNewUrlParser: true});
const path=require("path");
const bodyparser=require("body-parser");

//SCHEMA OF CONTACT
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });

const contact = mongoose.model('contact', contactSchema);
const fluffy = new contact;
fluffy.save(function (err,fluffy) {
    if (err) return console.error(err);
    
  });


 
//START THE SERVER
const port = 80;
app.listen(port,()=>{console.log(`the application started sucessfully port ${port}`)});

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use (express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//END POINT SPECIFIC STUFF
app.get('/', (req, res)=>{
    const params={};
    res.status(200).render('home.pug', params);
    })
app.get('/contact', (req, res)=>{
    const params={};
    res.status(200).render('contact.pug', params);
    })

   
app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body);
    
    mydata.save().then(()=>{
        res.send(" this item has been save to database")
       
    })
    .catch(()=>{
     res.status(400).send (" item was not saved to the database")
})})

