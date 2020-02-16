const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
	//authenticate and login user and send jwt token
	authenticate: (req, res, next)=> {
		userModel.findOne({email:req.body.email}, (err, user)=>{
					if (err) {
						next(err);
					} else {
						if(user != null && bcrypt.compareSync(req.body.password, user.password)) {
						 const token = jwt.sign({id: user._id,email:user.email,manager:user.isManager}, req.app.get('secretKey'), { expiresIn: '2h' });
						 if (user.isManager){
							res.json({
								status:"success", message: "manager found!!!", data:{
								role:"Manager", token:token
							}});	
						 }
						 else if (user.isDeactivated){
							res.json({
								message: "Deactivated User"
							});
						 }
						 else{
							res.json({
								status:"success", message: "user found!!!", data:{
								role:"User", token:token
							}});	
						 }
						}
						else{
							res.json({
								status:"error", message: "Invalid email/password!!!", data:null
							});
						}
					}
        });
	},
	createAccount: (req,res,next) =>{
		//Registers user
		if(validateEmail(req.body.email)){
			userModel.findOne({email:req.body.email},(err,result)=>{
				if (err){
					next(err);
				}
				else if (result !== null){
					res.send({message:"Email is Taken"})
				}
				else{
					userModel.create({
						email:req.body.email,
						password:req.body.password},
						(err,result)=>{
							if (err){
								next(err);
							}
							else{
								res.json({message:"Success"})
							}
						}
					)
				}
			})
		}
		else res.json({message:"Invalid Email"})
	}
}