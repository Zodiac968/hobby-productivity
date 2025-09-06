import Modal from "./Modal";
import { useState } from "react";

function EditTaskModal({ task, onSave, isOpen, onClose }) {
  if (!task) return;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [deadline, setDeadline] = useState(
    task.deadline?.substring(0, 10) || null
  );
  const [status, setStatus] = useState(task.status);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    onSave({ id: task._id, title, description, deadline, status });
  }

  function preventEnterSubmit(event) {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col w-200 h-100 m-2 p-2"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 mx-1">
          <select
            name="statusDropDown"
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">todo</option>
            <option value="in-progress">in-progress</option>
            <option value="done">done</option>
          </select>
        </div>
        <input
          className="text-4xl p-2 leading-relaxed outline-blue-500 rounded-lg m-1"
          type="text"
          id="title"
          defaultValue={title}
          placeholder="New Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <label htmlFor="description" className="m-1">
          Description
        </label>
        <textarea
          className="m-1 p-2 border border-gray-200 hover:bg-gray-100 h-20 rounded-lg outline-blue-500"
          type="text"
          id="description"
          defaultValue={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="deadline" className="m-1">
          Deadline
        </label>
        <input
          className="m-1 w-1/4 border border-gray-200 rounded-lg p-2"
          type="date"
          id="deadline"
          defaultValue={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        ></input>
        <button
          className="bg-blue-500 m-2 p-2 w-1/2 mx-auto rounded-lg text-white font-medium hover:bg-blue-700 focus:border-2 focus:border-blue-900"
          type="submit"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
