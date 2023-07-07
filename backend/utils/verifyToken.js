const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({success : false , message : 'Token invalid'});
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,data)=>{
        if(err){
            return res.status(401).json({success : false , message : "You're not authorized"});
        }
        req.user = data;
        next();
    })
}

const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.body.role === "admin"){
            next();
        }else{
            return res.status(401).json({success : false , message : 'you are not authenticated'})
        }
    })
}

const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next,()=>{
        if(req.body.role === "admin"){
            next();
        }else{
            return res.status(401).json({success : false , message : 'you are not authorize'})
        }
    })
}

module.exports = {
    verifyToken,verifyAdmin,verifyUser
}