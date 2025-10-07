import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState([]);

 useEffect(() => {
  fetch("http://127.0.0.1:5000/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched tasks:", data);  // Debug log
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]); // fallback
      }
    })
    .catch((err) => console.error("Failed to fetch tasks", err));
}, []);

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks.slice(0, 4)]);
  };

  const completeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex items-center justify-center h-[110vh] w-full bg-gray-300">
      <div className="flex bg-white rounded-xl shadow-lg w-4/5 h-[70%] overflow-hidden mt-[-40px]">
        {/* Left section */}
        <div className="flex flex-1 flex-col justify-center items-center p-10 border-r border-gray-200">
          <TaskForm onTaskAdded={addTask} />
        </div>

        {/* Right section */}
        <div className="flex-1 p-10 overflow-y-auto">
          <TaskList tasks={tasks} onTaskCompleted={completeTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
