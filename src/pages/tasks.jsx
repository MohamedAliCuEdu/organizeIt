import React from "react";
import useTasksContext from "../hooks/useTasksContext";
import TasksIndex from "../components/tasks/tasksIndex";
import PageTitle from "../components/pageTitle";
import BulletsLoading from "../components/loading/bulletsLoading";
import NoContent from "../components/noContent";
import ErrorDiv from "../components/error-div";
import { FaTasks } from "react-icons/fa";
import MESSAGES from "../constants/messages";

function Tasks() {
  console.log("--page");
  const { isLoading, fetchDataErr, allTasks, taskEdit } = useTasksContext();

  return (
    <main className="tasks-page">
      {taskEdit && <TasksIndex.TaskEditPopup />}
      <div className="container">
        <PageTitle title="tasks">
          <FaTasks />
        </PageTitle>
        <header className="tasks-header">
          <div className="header-content">
            <TasksIndex.AddTask />
            <TasksIndex.SearchTask />
          </div>
        </header>
        <TasksIndex.StatusFilter />
        {isLoading ? (
          <BulletsLoading />
        ) : fetchDataErr ? (
          <ErrorDiv msg={MESSAGES.errors.failedLoadData} />
        ) : allTasks?.length <= 0 ? (
          <NoContent />
        ) : (
          <TasksIndex.TasksList />
        )}
      </div>
    </main>
  );
}
export default Tasks;
