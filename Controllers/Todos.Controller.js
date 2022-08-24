const { TodoModel }=require("../Models/Todo.model");
const { UserModel } = require("../Models/User.Model");


const getTodos=async(email)=>{
    console.log(email);
    try {
        const TodosData = await UserModel.aggregate([
            { $match: { email:email } },
            {
              $lookup: {
                from: "todos",
                localField: "Todos.todoId",
                foreignField: "id",
                as: "TodoItems",
              },
            },
        ]);
        return {
            message: "TodoItems received successfully",
            status: "success",
            data:TodosData[0].TodoItems,
        };
    } catch (error) {
        return { message: "something went wrong", status: "error" };
    }
}
const CreateTodos=async ({taskname,status,tag,email})=>{
    try {
        const TodoData= new TodoModel({
           taskname:taskname,
           status,
           tag:tag
        })
        await TodoData.save()
        await UserModel.updateOne(
            { email },
            { $push: { Todos: { productId: TodoData._id } } }
        );
        return { message:"todo created",status:"succefull", data:TodoData}
    } catch (error) {
        return { message: "something went wrong", status: "error" };
    }
}


const EditTodoData=async({id,data})=>{
    try {
        await TodoModel.findByIdAndUpdate(id, data);
        return { message: "todo Updated", status:"success" }
    } catch (error) {
        return { message: "something went wrong", status: "error" }
    }
}

const DeleteBlog=async(id)=>{
    try {
        await  TodoModel.deleteOne({_id:id})
        return({ message: "Todo deleted succesfully", status:"success"});
    } catch (error) {
        return { message: "something went wrong", status: "error" }
    }
}

module.exports={CreateTodos, EditTodoData, DeleteBlog, getTodos}