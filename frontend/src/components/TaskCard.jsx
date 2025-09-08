import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { useRef } from "react";

function TaskCard({ task, onClick, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: task._id,
    });

  const startRef = useRef(null);
  const THRESHOLD_SQ = 1; // ~1px tolerance for detecting click vs drag

  const handlePointerDown = (e) => {
    console.log(e);
    if (e.target.id !== "del-button") {
      // record starting coords
      startRef.current = { x: e.clientX, y: e.clientY };

      // call dnd-kit’s original handler so drag still works
      listeners?.onPointerDown?.(e);

      const handlePointerUp = (ev) => {
        const start = startRef.current;
        startRef.current = null;

        if (start) {
          const dx = (ev.clientX || 0) - start.x;
          const dy = (ev.clientY || 0) - start.y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= THRESHOLD_SQ) {
            // trigger click if movement was tiny
            onClick?.();
          }
        }

        listeners?.onPointerUp?.(ev);

        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
      };

      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    }
  };

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={handlePointerDown}
      className="flex justify-between m-2 bg-white p-2 px-3 rounded-xl shadow-xs border-2 border-gray-200 hover:border-blue-400 group cursor-grab"
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
        id="del-button"
        className="invisible group-hover:visible hover:bg-gray-200 rounded-2xl text-gray-800"
        onClick={(e) => {
          e.stopPropagation(); // prevent parent click
          onDelete({ id: task._id, status: task.status });
        }}
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskCard;
