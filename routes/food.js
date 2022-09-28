const express = require('express');

// custom module imports
let restaurantModel = require('../models/restaurant-model');
const verifyToken = require('../verify-token');


const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const foodModel = require('../models/food-model');



// endpoint to add/Create food Item

router.post('/create',verifyToken,(req,res)=>{
    const form = new formidable.IncomingForm();
    //  console.log(form);
    form.parse(req, (err, fields, files)=>{
        // console.log(fields)
        // console.log(err)
        if(!err){
            console.log("contents"+ files.contents)
            if(files.contents !== undefined && files.contents !== null){
                let ext = files.contents.originalFilename.split(".")[1].toUpperCase();
                if(ext==="PNG" || ext==="JPEG" || ext==="JPG" || ext==="MP4"){
                    let newFilePath = "./food_content/"+files.contents.newFilename+"."+ext;
                    //newFileName is used as complete url which can be used by frontend to access the resources
                    let newFileName = "http://localhost:8000/pics/postimages/"+files.contents.newFilename+"."+ext;
                    fs.readFile(files.contents.filepath,(err,fileCon)=>{
                        if(!err){
                            fs.writeFile(newFilePath,fileCon,(err)=>{
                                if(!err){   
                                    fields["contents"]=[newFileName];
                                    // console.log(fields);
                                    foodModel.create(fields)
                                    .then((doc)=>{
                                        res.status(200).send({success:true, message:"Food Item Created successfully"});
                                    })
                                    .catch((err)=>{
                                        console.log(err)
                                        res.send({success:false, message:"Some Problem Try again"});
                                    })
                                    
                                }else{
                                    console.log(err)
                                }
                                
                            });
                            
                        }
                        else{
                            console.log(err)
                        }
                    })
                    
                    
                }
                else{
                    res.send({success:false, message:"File Type not Valid"});
                }
            }
            else{
                console.log("inside else")
                foodModel.create(fields)
                .then((doc)=>{
                    res.status(200).send({success:true, message:"Food Item Created successfully"});
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({success:false, message:"Some Problem Try again"});
                })
            }
            
            
        }
    })
})


// endpoint to find food items of single Restaurant

router.get('/food_items/:rest_id',verifyToken,(req,res)=>{
    let restId = req.params.rest_id;
    foodModel.find({restaurant_id:restId})
    .then((foodItems)=>{
        res.send({success:true, foodItems});
    })
    .catch((err)=>{
        console.log(err);
        res.send({success:false, message:"Some Problem while fetching Foods"});
    })

})

// endpoint to find all Foods

router.get("/all_food_items",verifyToken,(req,res)=>{
    // console.log("movie")
    foodModel.find()
    .then((allFoods)=>{
        res.send({success:true, allFoods});
        // console.log(allFoods)
    })
    .catch((err)=>{
        console.log(err);
        res.send({success:false, message:"Some Problem while fetching Food List"})
    })
})


// endpoint to update foodItem

router.put('/updatefood/:id',verifyToken,(req,res)=>{
    const form = new formidable.IncomingForm();
    let foodItemId = req.params.id;
    // console.log(foodItemId)
    // console.log(req.body)
    // foodModel.update({_id:foodItemId},req.body)
    // .then((info)=>{
    //     res.send({success:true, message:"Food Item update successfull"});
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     res.send({success:false,message:"Some Problem while updating Food Item"});
    // })
    form.parse(req, (err, fields, files)=>{
        // console.log(fields)
        // console.log(err)
        if(!err){
            if(files.contents !== undefined && files.contents !== null){
                let ext = files.contents.originalFilename.split(".")[1].toUpperCase();
                if(ext==="PNG" || ext==="JPEG" || ext==="JPG" || ext==="MP4"){
                    let newFilePath = "./food_content/"+files.contents.newFilename+"."+ext;
                    //newFileName is used as complete url which can be used by frontend to access the resources
                    let newFileName = "http://localhost:8000/pics/postimages/"+files.contents.newFilename+"."+ext;
                    fs.readFile(files.contents.filepath,(err,fileCon)=>{
                        if(!err){
                            fs.writeFile(newFilePath,fileCon,(err)=>{
                                if(!err){   
                                    fields["contents"]=[newFileName];
                                    // console.log(fields);
                                    foodModel.updateMany({_id:foodItemId},{$set:fields})
                                    .then((doc)=>{
                                        res.status(200).send({success:true, message:"Food Item Updated  successfully"});
                                    })
                                    .catch((err)=>{
                                        console.log(err)
                                        res.send({success:false, message:"Some Problem Try again"});
                                    })
                                    
                                }
                                else{
                                    console.log(err)
                                }
                                
                            });
                            
                        }
                        else{
                            console.log(err)
                        }
                    })
                    
                    
                }
            }
            else{
                foodModel.updateMany({_id:foodItemId},{$set:fields})
                .then((doc)=>{
                    res.status(200).send({success:true, message:"Food Item Updated  successfully"});
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({success:false, message:"Some Problem Try again"});
                })
            }
            
            // else{
            //     res.send({success:false, message:"File Type not Valid"});
            // }
        }
        else{
            console.log(err)
        }
    })
    
})


// endpoint to delete FoodItem

router.delete('/deletefood/:id',verifyToken,(req,res)=>{
    let foodId = req.params.id;
    foodModel.deleteOne({_id:foodId})
        .then((info)=>{
            res.send({success:true, message:"Food Item Deleted"})
        })
        .catch((err)=>{
            console.log(err);
            res.send({message:"Some problem while deleting request"});
        })
})




module.exports = router;