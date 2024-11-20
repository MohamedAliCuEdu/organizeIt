import { useContext } from "react";
import TasksContext from "../context/tasksContext";

function useTasksContext() {
  return useContext(TasksContext);
}

export default useTasksContext;
