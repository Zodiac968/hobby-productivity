function TaskCard({ task, onClick, onDelete }) {
  return (
    <div onClick={onClick}>
      <h4>{task.title}</h4>
      {task.deadline && <p>{new Date(task.deadline).toLocaleDateString()}</p>}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task._id);
        }}
      >
        Del
      </button>
    </div>
  );
}

export default TaskCard;
