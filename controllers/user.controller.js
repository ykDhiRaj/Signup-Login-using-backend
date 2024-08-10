import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

export const signup = async (req,res)=>{
   try {
    let{fullname,email,password} = req.body;

    let checkUser = await User.findOne({email:email});
    if(checkUser){
        res.status(409).json("User already exists");
    }
    else{
        bcrypt.genSalt(10, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                let createdUser = await User.create({
                    fullname,
                    email,
                    password:hash
                });
                if(createdUser){
                    var token = jwt.sign(email, 'shhhhh');
                    res.cookie("token",token);
                    res.status(200).json("user successfully created");
                }
                else{
                    res.status(400).json("Error occured ")
                }
               
            });
        });
    }

   } catch (error) {
        res.status(400).json("Error occured");
   }
}



export const login = async (req,res)=>{
    try {
        let {email,password} = req.body;
        let user = await User.findOne({email:email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result == true){
                    var token = jwt.sign(email, 'shhhhh');
                    res.cookie("token",token);
                    res.status(200).json("Logged in successfully");
                }
                else{
                    return res.status(400).json("Wrong credentials");
                }
            });
        }
        if(!user){
           return res.status(400).json("Account doesn't exist");
        }
    } catch (error) {
        return res.status(400).json("Some internal error occured")
    }
}