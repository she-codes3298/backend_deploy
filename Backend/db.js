import mongoose from "mongoose";

//mongoose.connect("mongodb+srv://rupali4bharti:RUPAli%40123@cluster0.gvqpzyv.mongodb.net/");


mongoose.connect("mongodb+srv://rupali4bharti:RUPAli%40123@cluster0.gvqpzyv.mongodb.net/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});


const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
});

export const todo = mongoose.model("todos", todoSchema);
