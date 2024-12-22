import React, { useState } from "react";
import useTasksContext from "../../hooks/useTasksContext";
import { MdOutlineAddBox } from "react-icons/md";

function AddTask({}) {
  const { addTaskPending, addTaskApi } = useTasksContext();

  // new task state:
  const [newTask, setNewTask] = useState("");
  // handle new task input change:
  const handleTaskInput = (val) => {
    setNewTask(val);
  };

  return (
    <form
      method="post"
      onSubmit={async (e) => {
        await addTaskApi(e, newTask);
        handleTaskInput("");
      }}
    >
      <input
        className="input-flex-wd light-input"
        type="text"
        name="content"
        value={newTask}
        placeholder="add new task..."
        onChange={(e) => handleTaskInput(e.target.value)}
        minLength="1"
        maxLength="80"
        required
      />
      <button
        className="icon-btn lg-icon dark-btn"
        type="submit"
        disabled={addTaskPending}
      >
        <MdOutlineAddBox />
      </button>
    </form>
  );
}
export default React.memo(AddTask);
