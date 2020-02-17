//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require("./routes/user");
var jwt = require("jsonwebtoken");
const UserSchema = require('./models/user')

//Mongoose and db connection
mongoose.connect("mongodb://mongodb:27017/user-test",{
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
//App routing
app.use('/auth',user);
//Authenticate User Middleware
authenticateUser=(req,res,next)=>{
    jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'),(err,decoded)=>{
        if (err){
            res.json({status:"error",message:"invalid token"})
        } else{
            req.body.userId = decoded.id;
            req.body.email = decoded.email;
            req.body.isManager = decoded.manager 
            next();
        }
    });
}
//get all users
app.get('/users',(req,res)=>{
    UserSchema.find({},(err,result)=>{
        res.send(result)
    })
})

if (process.env.NODE_ENV==="Test"){
    var port = 9001;
}else{
    var port = 9000;
}
app.listen(port,()=>console.log(`Server running on:${port}`))

module.exports = {
    app
};
