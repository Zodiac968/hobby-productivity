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
          placeholder="New Title"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={preventEnterSubmit}
          required
        ></input>
        <label htmlFor="description" className="m-1">
          Description
        </label>
        <textarea
          className="m-1 p-2 border border-gray-200 hover:bg-gray-100 h-20 rounded-lg outline-blue-500"
          type="text"
          id="description"
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
          onChange={(e) => setDeadline(e.target.value)}
          onKeyDown={preventEnterSubmit}
        ></input>
        <button
          className="bg-blue-500 m-2 p-2 w-1/2 mx-auto rounded-lg text-white font-medium hover:bg-blue-700 focus:border-2 focus:border-blue-900"
          type="submit"
        >
          Add
        </button>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
