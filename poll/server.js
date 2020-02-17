//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var jwt = require("jsonwebtoken");
const pollSchema = require("./models/polls");
//Mongoose and db connection, Connecting to Local Mongodb
mongoose.connect("mongodb://mongodb:27017/polls",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("DB CONN SUCCESS");
})
.catch((err)=>{
    console.log(err)
});

//Initialization
const app = express();
//enable CORS
app.use(cors());
//Configs
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
//Set SecretKey
app.set("secretKey","very-secret")
//Helper function for sanitizing
function hasNoSymbols(input){
    var regex=/[!@#\$%\^&\*\(\)\{\}\?<>\+:;",\.\\]/;
    return (!regex.test(input));
}
//Checks corect email formating
function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
}
//Check if only number inputs
function isNumber(input){
    var regex = /^[0-9]+$/
    return regex.test(input)
}

//Getting all Polls by a specific User
app.get("/poll/user/:id",(req,res)=>{
    pollSchema.find({userId:req.params.id},(err,data)=>{
        if (err){
            console.log(err)
            res.send({message:"Error"})
        }
        else{
            res.send(data)
        }
    })
})
//Add a new Poll
app.post("/poll/add",(req,res)=>{
    //Build Poll Parameters
    //Id is generated as a random 6 digit number for now, without 0s
    let pollId = Math.floor(Math.random()*900000+10000)
    let poll = new pollSchema({
        pollId: pollId,
        title: req.body.title,
        userId: "Me",
        selections: req.body.selections,
        createDate: Date.now(),
    })
    poll.save((err,cb)=>{
        if (err){
            console.log(err)
            res.send({message:"error"})
        }
        else{
            //Return id of new Poll
            res.send({message:"Success",id:cb.id})
        }
    })
})
//Response Routing, Anyone can respond to poll
app.post("/poll/:id",(req,res)=>{
    //Building a response From Request
    var response = {
        ip: req.ip,// Get IP from request
        selection: req.body.selection, //What the user selected
        responseTime: Date.now(),
    }
    //Push the response into the poll object
    pollSchema.updateOne({_id: req.params.id},{$push:{
        responses:response
    }},(err,raw)=>{
        //Response Handling
        if (err){
            res.send({message:"Failed to Add Response"})
        }
        else{
            console.log(raw)
            res.status(200).send({message:"Success"})
        }
    })
})
//Get All Polls
app.get("/poll/all",(req,res)=>{
    pollSchema.find({},(err,data)=>{
        res.send(data)    
    })
})
//Getting a specific Poll
app.get("/poll/:id",(req,res)=>{
    //Get id from the url
    var id = req.params.id
    try{
        //Look for Poll in db
        pollSchema.findOne({pollId:id},(err,data)=>{
            if (err){
                //Poll Is Not in DB
                res.send({message:"Poll Does Not Exist"})
            }
            else {
                //Success
                res.send(data)
            }
        })
    }
    catch(err){
        console.log(err)
        res.send({message:"Database Error"})
    }
})

//Authenticate User Middleware, Currently unused
function authenticateUser(req,res,next){
    jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'),(err,decoded)=>{
        if (err){
            res.json({status:"error",message:"invalid token"})
        } else{
            req.body.email = decoded.email,
            req.body.isManager = decoded.manager
            next();
        }
    });
}


var port = 3002;
app.listen(port,()=>console.log(`Server running on:${port}`))