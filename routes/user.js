const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// custom module imports

let userModel = require('../models/user-model');
let restaurantModel = require('../models/restaurant-model');
const verifyToken = require('../verify-token');

const router = express.Router();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"drashtidummy10@gmail.com",
        pass:"tivegtzazcgbkhig"
    }

});


// endpoint for Registeration/user creation

router.post("/signup",(req,res)=>{
    let user = req.body;
    let requireModel;
    console.log(user)
    if(user.atype === 'customer'){
        requireModel = userModel;
    }else{
        requireModel = restaurantModel;
    }
    console.log(requireModel);
    bcryptjs.genSalt(10, (err,salt)=>{
        if(err===null || err === undefined){
            bcryptjs.hash(user.password, salt , (err, enc_pwd)=>{
                if(err === null || err === undefined){
                    user.password = enc_pwd;
                    requireModel.create(user)
                    .then((doc)=>{
                        let mailBody={
                            from:"drashtidummy10@gmail.com",
                            to:user.email,
                            subject:"Thank you for signup with xWorld",
                            text:"Enjoy sharing and connecting with xworld's",
                            html:`
                            <div style="height: 150px;width:500px;text-align: center;background-color:blueviolet;font-size: 30px;font-weight: bold;justify-content: center;align-items: center;">
                                welcome To xWorld
                            </div>
                            `
                        }

                        transporter.sendMail(mailBody,(error,message)=>{
                            if(!error){
                                console.log(message);
                                console.log("email sent");
                            }
                            else{
                                console.log(error);
                                console.log("some issue");
                            }
                        })
                        res.status(201).send({success:true, message:"User Registered succesfully"});
                    })
                    .catch((err)=>{
                        if(err.code===11000){
                            console.log(err)
                            res.status(409).send({success:false, message:"email or Username already exists"})
                        }
                        else{
                            console.log(err)
                            console.log("-------------------")
                            console.log(err.errors[0].properties)
                            res.status(400).send({success:false, message:err.errors.name.properties.message})
                        }
                    })
                }
            })
        }
    })
})


// end point for login


router.post("/login",(req,res)=>{
    let userCred= req.body;
    if(userCred.atype === 'customer'){
        requireModel = userModel;
    }else{
        requireModel = restaurantModel;
    }
    requireModel.findOne({email:userCred.email})
    .then((user)=>{
        console.log(user)
        if(user!=undefined && user!=null){
            bcryptjs.compare(userCred.password, user.password,(err,result)=>{
                if(err===null || err===undefined){
                    if(result=== true){
                        
                        jwt.sign(userCred, "secretkey", {expiresIn:"1d"},(err,token)=>{
                            if(err===null || err===undefined){
                                res.status(200).send({success:true, token:token, username:user.name, user_id:user._id, accountType: user.atype});
                            }
                        })
                    }
                    else{
                        res.status(403).send({message:"incorrect Password"});
                    }   
                }
            })
        }
        else{
            res.status(404).send({message:"Username or email id is not valid"});
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(503).send({success:false,message:"some problem while entering email"});
    })
})

module.exports = router;
