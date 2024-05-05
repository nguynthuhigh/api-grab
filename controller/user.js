const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const signUp = (req,res)=>{
    const { username, password } = req.body;
    bcrypt.hash(password,9).then(async (hash)=>{
        User.create({username, password:hash}).then(() =>{
            res.status(200).json({message:"User successfully created",User})
        })
        .catch(err =>{
            res.status(401).json({message:"Fail",error:err.message})

        })
    })
  
};
const Login = async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result === true){
                const payload = {
                    id:user._id,
                }
                var token =  jwt.sign(payload,process.env.JWT_PRIVATE_KEY,{expiresIn: '7d',algorithm:'HS256'});
                res.setHeader('Authorization','Bearer ' + token);
                res.status(200).json({
                    message:"Login successful!",
                    token:token
                })
            }
            else{
                res.status(401).json({
                    message: "Login not successful",
                })
            }
        });
    }
    else{
        return res.status(401).json({message:"pw or id wrong"})
    }
}

const authUser = (req, res) => {
    const token = req.headers.authorization?.slice(7);
    if (token) {
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                console.log('Decoded JWT:', decoded);
                const user = User.findOne({_id:decoded.id})
                res.status(200).json({ user });
            }
        });
    } else {
         res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {signUp,Login,authUser}