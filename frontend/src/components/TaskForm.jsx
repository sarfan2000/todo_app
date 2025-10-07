import { useState } from "react";
import PropTypes from "prop-types";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitTask = async () => {
    if (!title.trim() || !description.trim()) return;
    try {
      const res = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add task");

      onTaskAdded(data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  return (
    <div className="w-full max-w-[300px]">
      <h2 className="text-[20px] font-semibold mb-5">Add a Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none min-h-[80px] resize-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end">
        <button
          onClick={submitTask}
          className="w-[30%] rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}

TaskForm.propTypes = { onTaskAdded: PropTypes.func.isRequired };
export default TaskForm;
