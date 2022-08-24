const { Schema, model } =require("mongoose")

const UserSchema= new Schema(
    {
        name:{type:String, require:true},
        email:{type:String, require:true},
        password:{type:String, require:true},
        ip_address:String,
        Todos:[
            {
                todoId:Schema.Types.ObjectId
            },
        ],
    },
    {collection:"user"}
)

const UserModel=model("UserModel",UserSchema,"user")
module.exports={UserModel}
