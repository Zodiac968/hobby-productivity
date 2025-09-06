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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          defaultValue={title}
          placeholder="New Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <label>Description</label>
        <input
          type="text"
          id="description"
          defaultValue={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          type="date"
          id="deadline"
          defaultValue={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        ></input>
        <select
          name="statusDropDown"
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
