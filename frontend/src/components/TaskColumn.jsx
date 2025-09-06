import TaskCard from "./TaskCard.jsx";

function TaskColumn({
  title,
  status,
  tasks,
  onAddTask,
  onTaskClick,
  onDelete,
}) {
  return (
    <div className="flex flex-col flex-1 max-w-xs bg-gray-100 border border-gray-200 shadow rounded-xl p-2">
      <h3 className="text-xl font-medium text-center block ">{title}</h3>
      <div>
        {tasks &&
          tasks
            .filter((t) => t.status === status)
            .map((t) => {
              return (
                <TaskCard
                  key={t._id}
                  task={t}
                  onClick={() => {
                    onTaskClick(status, t);
                  }}
                  onDelete={onDelete}
                />
              );
            })}
      </div>
      <button
        className="hover:bg-gray-300 mx-2 p-2 rounded-lg text-gray-700"
        onClick={() => {
          onAddTask(status);
        }}
      >
        Add Card
      </button>
    </div>
  );
}

export default TaskColumn;
