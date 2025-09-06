import Modal from "./Modal";
import { useEffect, useState } from "react";

function AddTaskModal({ defaultStatus, onSave, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(() => {
    if (isOpen) setStatus(defaultStatus);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    onSave({ title, description, deadline, status });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="New Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <label>Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          type="date"
          id="deadline"
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
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
