
const e = require("express");
const { UserModel }=require("../Models/User.Model")
const jwt=require("jsonwebtoken")
const dotenv = require("dotenv").config();

// Registration.....
const User_Registration= async (name,email,password,ip_address)=>{
    try {
        const user = await UserModel.find({email})
        console.log(user.length,"ji");
        if(user.length>0){
            return { message: "user already exists", status: "exists" };
        }
        else{
            let NewUserDetails={
                name,email,password,ip_address,Todos:[]
            }
            const NewUser=new UserModel(NewUserDetails)
            NewUser.save()
            return { message: "user created", status: "success" };
        }
    } catch (error) {
        return { message: "something went wrong", status: "error" };
    }
}

const User_login= async (email,password)=>{
    const secret1 = process.env.SECRET_KEY;
    const secret2 = process.env.SECRET;
    try {
        const userData = await UserModel.find({email})
        if(userData.length==0){
            return { message: "new user", status: "new" };
        }
        else if(userData[0].email ===email && userData[0].password===password){
            const token=jwt.sign({email:userData[0]?.email, password:userData[0]?.password},
                secret2,{
                expiresIn:"1hr"
            })
            const refreshToken=jwt.sign({email:userData[0]?.email, password:userData[0]?.password},
                secret1,{
                expiresIn:"7d"
            })
            return { message: "login success", status: "success", token, refreshToken };
        }
        else{
            return { message: "invalid credentials", status: "failed" }
        }
    } catch (error) {
        return { message: "something went wrong", status: "error" }
    }
}

module.exports={ User_Registration,User_login }