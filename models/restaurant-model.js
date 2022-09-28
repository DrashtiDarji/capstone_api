const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema({
    name:{
        type: String,
        required : [true, "Restaurant Name is Mandatory"]
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
    address:{
        type: String,
        required : [true, "Restaurant Address is Mandatory"]
    },
    open:{
        type: String
        // required : [true, "Restaurant Open Time is Mandatory"]
    },
    close:{
        type: String
        // required : [true, "Restaurant Close Time is Mandatory"]
    },
    pincode:{
        type: String,
        required : [true, "Restaurant Pincode is Mandatory"]
    },
    atype:{
        type: String,
        enum:["admin", "customer"],
        default: "admin"
    }
},{timestamps:true})

let restaurantModel = mongoose.model("restaurants", restaurantSchema);
module.exports = restaurantModel;