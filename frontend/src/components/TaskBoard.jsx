import TaskColumn from "./TaskColumn.jsx";
import axiosInstance from "../axios.js";
import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal.jsx";
import EditTaskModal from "./EditTaskModal.jsx";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("todo");
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [columnData, setColumnData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDragEnd = async (event) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    console.log("Dragged: ", active.id, "Droppped on: ", over.id);
    let newTasks = tasks;
    if (
      active.id !== over.id &&
      !["todo", "in-progress", "done"].includes(over.id)
    ) {
      const oldIndex = tasks.findIndex((t) => t._id === active.id);
      const newIndex = tasks.findIndex((t) => t._id === over.id);
      newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);
    }
    const newColData = {
      ...columnData,
      todo: newTasks.filter((t) => t.status === "todo").map((t) => t._id),
      inprogress: newTasks
        .filter((t) => t.status === "in-progress")
        .map((t) => t._id),
      done: newTasks.filter((t) => t.status === "done").map((t) => t._id),
    };
    setColumnData(newColData);

    try {
      const saved = await axiosInstance.put("/task/column", {
        todo: newColData.todo,
        inprogress: newColData.inprogress,
        done: newColData.done,
      });
      console.log(saved);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDragStart = (event) => {
    setActiveTask(tasks.find((p) => p._id === event.active.id));
    console.log(event.active.id);
  };

  const handleDragOver = ({ over }) => {
    console.log(over.id);
    let newTasks = [];
    if (
      ["todo", "in-progress", "done"].includes(over.id) &&
      over.id !== activeTask.status
    ) {
      newTasks = tasks.map((t) =>
        t._id === activeTask._id ? { ...t, status: over.id } : t
      );
      setTasks(newTasks);
      setActiveTask((p) => {
        return { ...p, status: over.id };
      });
    }
    const overTask = tasks.find((t) => over.id === t._id);
    if (overTask && overTask.status !== activeTask.status) {
      newTasks = tasks.map((t) =>
        t._id === activeTask._id ? { ...t, status: overTask.status } : t
      );
      setTasks(newTasks);
      setActiveTask((p) => {
        return { ...p, status: overTask.id };
      });
    }
    if (newTasks.length > 0) {
      const newColData = {
        ...columnData,
        todo: newTasks.filter((t) => t.status === "todo").map((t) => t._id),
        inprogress: newTasks
          .filter((t) => t.status === "in-progress")
          .map((t) => t._id),
        done: newTasks.filter((t) => t.status === "done").map((t) => t._id),
      };
      setColumnData(newColData);
    }
  };

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

  async function deleteTask({ id, status }) {
    try {
      const res = await axiosInstance.delete(`/task/${id}`);
      const newTasks = tasks.filter((t) => t._id !== id);
      setTasks(newTasks);

      const newColData = {
        ...columnData,
        todo: newTasks.filter((t) => t.status === "todo").map((t) => t._id),
        inprogress: newTasks
          .filter((t) => t.status === "in-progress")
          .map((t) => t._id),
        done: newTasks.filter((t) => t.status === "done").map((t) => t._id),
      };
      setColumnData(newColData);
      const saved = await axiosInstance.put("/task/column", {
        todo: newColData.todo,
        inprogress: newColData.inprogress,
        done: newColData.done,
      });
      console.log(saved);

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

      let copy = columnData;
      if (status === "todo")
        copy = { ...copy, todo: [...copy.todo, newTask.data._id] };
      if (status === "in-progress")
        copy = { ...copy, inprogress: [...copy.inprogress, newTask.data._id] };
      if (status === "done")
        copy = { ...copy, done: [...copy.done, newTask.data._id] };
      setColumnData(copy);
      const saved = await axiosInstance.put("/task/column", {
        todo: copy.todo,
        inprogress: copy.inprogress,
        done: copy.done,
      });
      console.log(saved);
    } catch (err) {
      console.log(err.message);
    }
  }
  //On initial load, fetch all the tasks for the given user
  useEffect(() => {
    async function fetchData() {
      try {
        const [taskRes, colRes] = await Promise.all([
          axiosInstance.get("/task"),
          axiosInstance.post("/task/initialize"),
        ]);
        // console.log(colRes.data.todo);
        setTasks(taskRes.data);
        setColumnData(colRes.data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <p>Loading....</p>;

  return (
    <div>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <div className="flex items-start space-x-10 m-6 mx-8">
          <TaskColumn
            title="Todo"
            status="todo"
            tasks={tasks}
            onAddTask={onAddModal}
            onTaskClick={onEditModal}
            onDelete={deleteTask}
            columnIds={columnData.todo}
          />
          <TaskColumn
            title="In-Progress"
            status="in-progress"
            tasks={tasks}
            onAddTask={onAddModal}
            onTaskClick={onEditModal}
            onDelete={deleteTask}
            columnIds={columnData.inprogress}
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={tasks}
            onAddTask={onAddModal}
            onTaskClick={onEditModal}
            onDelete={deleteTask}
            columnIds={columnData.done}
          />
        </div>
        <DragOverlay>
          {activeTask && (
            <div className="flex justify-between m-2 bg-white p-2 px-3 rounded-xl shadow-xs border-2 border-gray-200 hover:border-blue-400 group cursor-grab">
              <div>
                <h4 className="text-gray-800 text-md">{activeTask.title}</h4>
                {activeTask.deadline && (
                  <p className="text-red-500 text-sm">
                    Deadline:{" "}
                    {new Date(activeTask.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

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
