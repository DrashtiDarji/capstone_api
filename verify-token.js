const jwt = require('jsonwebtoken');
function verifyToken(req,res,next){
    if(req.headers.authorization!=undefined){
        let receivedToken = req.headers.authorization.split(" ")[1];
        jwt.verify(receivedToken,"secretkey", (err,data)=>{
            if(err===null || err===undefined){
                next();
            }
            else{
                console.log(err)
                res.send({message:"Invalid Token please login again"});
            }
        })
    }
    else{
        res.send({message:"Please Provide Token"});
    }

}

module.exports= verifyToken;