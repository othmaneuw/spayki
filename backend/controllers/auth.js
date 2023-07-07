const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req,res) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
    try {

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hash,
            photo : req.body.photo
        })
        await newUser.save();
        res.status(200).json({success : true , message : 'Successfully created'});
        
    } catch (error) {
        res.status(500).json({success : false , message : 'Failed to create '})
    }
}

const login = async (req,res) =>{
    try {
        const email = req.body.email;
        const user = await User.findOne({email});
        if(!user){
           return res.status(401).json({success : false , message : 'email or password incorrect'});
        }
        const checkPassword = await bcrypt.compare(req.body.password,user.password);
        if(!checkPassword){
            return res.status(401).json({success : false , message : 'email or password incorrect'})
        }
        const {password , role , ...rest} = user._doc;
        const token = jwt.sign({id : user._id,role: user.role}, process.env.JWT_SECRET_KEY,{expiresIn:'15d'});
        res.cookie('accessToken',token,{
            httpOnly : true,
            expires : token.expiresIn 
        }).status(200).json({success : true , message : "successfully login", data : {...rest},token,role})
    } catch (error) {
        res.status(500).json({success: false , message : 'Failed to login'})
    }
}

module.exports = {register,login}