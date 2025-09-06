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
    <div>
      <h3>{title}</h3>
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
