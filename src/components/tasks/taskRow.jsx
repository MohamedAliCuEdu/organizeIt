import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import useTasksContext from "../../hooks/useTasksContext";
import classNames from "classnames";

function TaskRow({ task }) {
  console.log("row task -------");
  const { updateTaskApi, deleteTaskApi, handleTaskEditView } =
    useTasksContext();
  const { _id, content, status, checked, createdAt } = task;
  // change task createdAt date formatting:
  let createtDate = new Date(createdAt).toDateString();

  return (
    <li className={classNames("task-row", { "task-checked": checked })}>
      <div className="task-container">
        <input
          id={`complete-${_id}`}
          type="checkbox"
          name="checked"
          checked={checked}
          onChange={(e) => updateTaskApi(e, _id)}
        />
        <div className="content">
          <p>{content}</p>
          <div className="task-info">
            <span className={`status-btn ${status}-bg`}>{status}</span>
            <span className="date">{createtDate}</span>
          </div>
        </div>
        <div className="task-options">
          <button
            className="edit flex-center"
            onClick={() => {
              handleTaskEditView(_id);
            }}
          >
            <FaEdit />
          </button>
          <button className="delete flex-center" onClick={() => deleteTaskApi(_id, status)}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskRow;
