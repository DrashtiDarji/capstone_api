const express = require('express');

// custom module imports
let orderModel = require('../models/order-model');
const verifyToken = require('../verify-token');
let finalOrderModel = require('../models/final-order-model');
const foodModel = require('../models/food-model');


const router = express.Router();

// endpoint to create  order-food connection
router.post("/create",verifyToken,(req,res)=>{
    console.log("Create api called")
    let order = req.body;
    // checking for private account on backend
    order.order_status = "cart";

    orderModel.create(order)
    .then((order)=>{
        res.send({success:true, message:"User-food Created and product added to cart"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem while creating connection"});
    })
   
})


// endpoint to get all the orders realted to user

router.get("/all_order_user/:id",verifyToken,(req,res)=>{
    let userId= req.params.id;
    console.log(userId)
    orderModel.find({user_id:userId})
    .then((allOrder)=>{
        console.log("all Orders    "+allOrder)
        res.send({success:true, allOrder});
        
    })
    .catch((err)=>{
        console.log(err);
        res.send({success:false, message:"Some Problem while fetching Order of user"})
    })
})


// end point to modify/ipdate Order

router.put('/updateorder/:id',verifyToken,(req,res)=>{
    let orderToBeUpdate = req.body;
    let orderId = req.params.id;
    console.log("orderid1:         "+orderId)
    orderModel.updateMany({_id:orderId},{$set:orderToBeUpdate})
    .then((doc)=>{
        res.status(200).send({success:true, message:"Order Updated  successfully"});
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false, message:"Some Problem Try again"});
    })
})


// delete order if removed quantity to 0
router.delete('/deleteorder/:id',verifyToken,(req,res)=>{
    let orderId = req.params.id;
    orderModel.deleteOne({_id:orderId})
        .then((info)=>{
            res.send({success:true, message:"Order from cart Deleted"})
        })
        .catch((err)=>{
            console.log(err);
            res.send({message:"Some problem while deleting request"});
        })
})


// endpoint to get all the order request to Particular Restaurant -food
router.get("/getrestaurantorder/:id",verifyToken, (req,res)=>{
    let foodId = req.params.id;
    orderModel.findOne({food_item_id:foodId})
    .then((order)=>{

        res.send({success:true, order})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem while fetching food request of restaurant"});
    })
})



// endpoint to create final Order collection

router.post("/createfinalorder",verifyToken,(req,res)=>{
    console.log("Create api called")
    let finalOrder = req.body;
    // checking for private account on backend
    // console.log("finalorder-----------"+finalOrder)
    finalOrder.final_order_status = "in_progress";


    finalOrderModel.create(finalOrder)
    .then((order)=>{
        res.send({success:true, message:"Order Request sent to Restuarant"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem while creating connection"});
    })
   
})


// endpoint to get finalorderId  from final-order model which have food of restuarant

router.get("/getfoodorderid/:id",verifyToken, (req,res)=>{
    let foodId = req.params.id;
    // console.log(foodId)
    finalOrderModel.findOne({ contents: {_id:foodId}} )
    .then((orderId)=>{

        console.log("first")
        console.log(orderId)
        res.send({success:true, orderId})
        
        // if(orderId !== null){
        //     console.log("first")
        //     console.log(orderId)
        //     res.send({success:true, orderId})
        // }
        
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem while fetching order id request"});
    })
})




module.exports = router;