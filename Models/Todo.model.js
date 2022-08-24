const { Schema, model } =require("mongoose")

const TodoSchema= new Schema(
    {
        taskname:{type:String,require:true},
        status:{type:String,require:true},
        tag:{type:String,require:true}
    },
    { collection: "todos" }
)

const TodoModel=model("TodoSchema",TodoSchema,"todos")
module.exports={TodoModel}

