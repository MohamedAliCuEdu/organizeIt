import React from "react";
import useTasksContext from "../../hooks/useTasksContext";
import SectionPopup from "../popups/components/section.popup";

function TaskEditPopup() {
  console.log("--edit");
  const { currentTask, handleCurrentTask, updateTaskApi, handleTaskEditView } =
    useTasksContext();
  const { content, status } = currentTask;
  return (
    <SectionPopup popupName="task-edit-popup" callBack={handleTaskEditView}>
      <form
        onSubmit={async (e) => {
          await updateTaskApi(e);
          handleTaskEditView();
        }}
      >
        <h3 className="popup-title">edit task</h3>
        <input
          className="input-full-wd light-input"
          type="text"
          name="content"
          value={content || ""}
          onChange={handleCurrentTask}
          required
          minLength={1}
          maxLength={50}
          placeholder="task..."
        />
        <select
          name="status"
          value={status || "pending"}
          onChange={handleCurrentTask}
        >
          <label htmlFor="completed"></label>
          <option name="completed" value="completed">
            completed
          </option>
          <option value="progress">in progress</option>
          <option value="pending">pending</option>
        </select>
        <button
          className="md-btn blue-btn"
          type="submit"
          value="save"
          disabled={content.length <= 0}
        >
          save
        </button>
      </form>
    </SectionPopup>
  );
}

export default TaskEditPopup;
