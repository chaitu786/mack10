const { Router } = require("express")
const { User_Registration, User_login } = require("../Controllers/User.Controller")
const dns=require("dns");

const UserRouter= Router();

UserRouter.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body
    let ip_address
    dns.lookup("http://localhost:8080/",(err,addresses,family)=>{
        ip_address=addresses
        console.log(addresses);
    })

    const { message, status } = await User_Registration(name,email,password,ip_address)
    if(status=="exists"){
        return res.status(200).send({ message, status });
    }
    else if(status=="error"){
        return res.status(404).send({ message, status });
    }
    else{
        return res.status(200).send({ message, status });
    }
})


UserRouter.post("/login", async (req, res) => {
    const { email,password } = req.body;
    const { message, status, token, refreshToken } = await User_login(email,password);
    if (status === "error") {
      return res.status(404).send({ message, status });
    } else if (status === "failed") {
      return res.status(201).send({ message, status });
    } else {
      return res
        .cookie("auth", token, { httpOnly: true, secure: false })
        .status(200)
        .send({ message, status, token, refreshToken });
    }
  });
module.exports={UserRouter}