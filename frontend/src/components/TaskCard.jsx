function TaskCard({ task, onClick, onDelete }) {
  return (
    <div
      className="flex justify-between m-2 bg-white p-2 px-3 rounded-xl shadow-xs border-2 border-gray-200 hover:border-blue-400 group"
      onClick={onClick}
    >
      <div>
        <h4 className="text-gray-800 text-md">{task.title}</h4>
        {task.deadline && (
          <p className="text-red-500 text-sm">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </p>
        )}
      </div>
      <button
        className="invisible group-hover:visible hover:bg-gray-200 rounded-2xl text-gray-800"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task._id);
        }}
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskCard;
