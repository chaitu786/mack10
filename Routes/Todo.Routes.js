const {Router}=require("express")
const { CreateTodos, EditTodoData, DeleteBlog, getTodos } = require("../Controllers/Todos.Controller")

const TodoRouter=Router()

TodoRouter.post("/", async(req,res)=>{
    let {email}=req.body
    const { message, status, data } = await getTodos(email);
  if (status === "error") {
    return res.status(404).send({ message, status });
  }
  return res.status(200).send({ message, status, data });
})


TodoRouter.post('/create',async(req,res)=>{
    const {message,status,data}=await CreateTodos({...req.body})
    if(status=="error"){
        return res.status(404).send({ message, status });
    }
    return res.status(200).send({ message, status,data });
})

TodoRouter.patch('/edit/:id',async(req,res)=>{
    const {id}=req.params
    const{message, status}= await EditTodoData({id,data:req.body})
    if(status==="error"){
        return res.status(404).send({ message, status });
    }
    return res.status(200).send({ message, status });
})

TodoRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const {message,status}=await DeleteBlog(id)
    if(status=="error"){
        return res.status(404).send({ message, status });
    }
    return res.status(200).send({ message, status });
})


module.exports={TodoRouter}
