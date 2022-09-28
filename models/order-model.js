const mongoose = require('mongoose');
const orederSchema = mongoose.Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    food_item_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"foods"
    },
    order_quantity:{
        type: Number,
        required: [true, "Order Quantity Required"]
    },
    order_price:{
        type: Number
    },
    order_total:{
        type:Number
    },
    order_status:{
        type: String,
        enum: ["cart","active", "pending", "accepted","in_progress","rejected", "cancelled","delivered"]
    },
    order_delivered:{
        type: String,
        enum: ["pending", "in_progress", "delivered","cancelled"]
    }
},{timestamps:true})


const orderModel = mongoose.model("orders", orederSchema);
module.exports = orderModel;