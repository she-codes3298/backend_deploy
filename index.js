import express from "express";
import { createTodo, updateTodo } from "./types.js";
import { todo } from "./db.js";

const app = express();
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({ todos });
});

app.post("/todo", async (req, res) => {
  try {
    console.log("📥 Incoming payload:", req.body);

    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
      console.log("❌ Validation failed:", parsedPayload.error);
      res.status(411).json({ msg: "you sent the wrong inputs" });
      return;
    }

    console.log("✅ Validation passed, saving to DB...");

    const newTodo = await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false
    });

    console.log("✅ Saved todo:", newTodo);

    res.json({ msg: "Todo created" });
  } catch (err) {
    console.error("🔥 Error in /todo route:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});


app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedUpdatePayload = updateTodo.safeParse(updatePayload);

  if (!parsedUpdatePayload.success) {
    res.status(411).json({ msg: "you sent a wrong input" });
    return;
  }

  await todo.updateOne(
    { _id: req.body.id },
    { completed: true }
  );

  res.json({ msg: "todo marked as completed" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

