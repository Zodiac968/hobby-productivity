import TaskCard from "./TaskCard.jsx";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect } from "react";

function TaskColumn({
  title,
  status,
  tasks,
  onAddTask,
  onTaskClick,
  onDelete,
  columnIds,
}) {
  const { setNodeRef } = useDroppable({ id: status });
  let filteredTasks = columnIds.map((id) => tasks.find((t) => t._id === id));

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col flex-1 max-w-xs bg-gray-100 border border-gray-200 shadow rounded-xl p-2"
    >
      <h3 className="text-xl font-medium text-center block ">{title}</h3>
      <div>
        {filteredTasks && (
          <SortableContext
            items={filteredTasks.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredTasks.map((t) => {
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
          </SortableContext>
        )}
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
