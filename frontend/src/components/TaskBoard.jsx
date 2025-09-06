import TaskColumn from "./TaskColumn.jsx";
import axiosInstance from "../axios.js";
import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal.jsx";
import EditTaskModal from "./EditTaskModal.jsx";

export function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("todo");
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  function onEditModal(status, t) {
    setActiveStatus(status);
    setActiveTask(t);
    setShowEditModal(true);
  }

  function onCloseEditModal() {
    setActiveTask(null);
    setShowEditModal(false);
  }

  function onAddModal(status) {
    setActiveStatus(status);
    setShowAddModal(true);
  }

  function onCloseAddModal() {
    setShowAddModal(false);
  }

  async function deleteTask(id) {
    try {
      const res = await axiosInstance.delete(`/task/${id}`);
      const updatedTasks = tasks.filter((t) => t._id !== id);
      setTasks(updatedTasks);
      if (res) console.log("Deleted task successfully");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function updateTask({ id, title, description, deadline, status }) {
    try {
      const saved = await axiosInstance.put(`/task/${id}`, {
        title,
        description,
        deadline,
        status,
      });
      if (saved) {
        setTasks((arr) =>
          arr.map((prev) => (prev._id === saved.data._id ? saved.data : prev))
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function createTask({ title, description, deadline, status }) {
    //Add task to database
    try {
      const newTask = await axiosInstance.post("/task", {
        title,
        description,
        deadline,
        status,
      });
      setTasks([...tasks, newTask.data]);
    } catch (err) {
      console.log(err.message);
    }
  }
  //On initial load, fetch all the tasks for the given user
  useEffect(() => {
    axiosInstance.get("/task").then((res) => setTasks(res.data));
  }, []);
  return (
    <div>
      <div>
        <TaskColumn
          title="Todo"
          status="todo"
          tasks={tasks}
          onAddTask={onAddModal}
          onTaskClick={onEditModal}
          onDelete={deleteTask}
        />
        <TaskColumn
          title="In-Progress"
          status="in-progress"
          tasks={tasks}
          onAddTask={onAddModal}
          onTaskClick={onEditModal}
          onDelete={deleteTask}
        />
        <TaskColumn
          title="Done"
          status="done"
          tasks={tasks}
          onAddTask={onAddModal}
          onTaskClick={onEditModal}
          onDelete={deleteTask}
        />
      </div>

      <AddTaskModal
        key={activeStatus} //key is used because the child props dont reinitialize on changing of activeStatus, this forces remount. Not good for heavy tasks
        isOpen={showAddModal}
        onClose={onCloseAddModal}
        onSave={createTask}
        defaultStatus={activeStatus}
      />
      <EditTaskModal
        isOpen={showEditModal}
        onClose={onCloseEditModal}
        onSave={updateTask}
        task={activeTask}
      />
    </div>
  );
}
