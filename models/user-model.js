const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is Mandetory"]
    },
    password:{
        type: String,
        required: [true, "Password is mandetory"]
    },
    email:{
        type:String,
        required:[true, "Email id is Mandetory"],
        unique: [true, "Email Id already Exists"]
    },
    mobile:{
        type: Number,
        required: true,
        maxLength: 10,
        minLength: 10

    },
    atype:{
        type: String,
        enum:["admin", "customer"],
        default: "customer"
    }
    
},{timestamps:true})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;