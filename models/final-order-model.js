const mongoose = require('mongoose');
const finalOrderSchema = mongoose.Schema({
    contents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"orders"
        }
    ],
    final_amount:{
        type: Number
    },
    location:{
        type: String,
        required: [true, "location is Required"]
    },
    final_order_status:{
        type: String,
        enum: ["accepted","in_progress","rejected", "cancelled","delivered"]
    }
},{timestamps:true})


const finalOrderModel = mongoose.model("finalOrders", finalOrderSchema);
module.exports = finalOrderModel;