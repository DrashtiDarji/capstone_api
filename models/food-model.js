const mongoose = require('mongoose');
const foodSchema = mongoose.Schema({
    restaurant_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"restaurants"
    },
    food_item :{
        type: String,
        required: [true, "Food Item is mandetory"]
    },
    quantity :{
        type: Number,
        required : [true, "Quantity of food Dish is necessary"]
    },
    price: {
        type: Number,
        required : [true, "Price of food Dish is necessary"]
    },
    discription:{
        type: String
    },
    contents:[{
        type: String
    }],
    food_type:{
        type: String,
        enum: ["main_cource", "starters", "beverages","desserts","bread", "accompaniments","rice"]
    },
    food_category:{
        type: String,
        enum: ["veg", "non_veg", "vegan"],
        required: [true, "food category is necessary"]
    }
},{timestamps:true})


const foodModel = mongoose.model("foods", foodSchema);
module.exports = foodModel;