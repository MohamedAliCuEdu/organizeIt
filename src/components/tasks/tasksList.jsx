import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useTasksContext from "../../hooks/useTasksContext";
import TasksIndex from "./tasksIndex";
import NoResults from "../NoResults";

function TasksList() {
  console.log("--list");
  const { allTasks, searchInput } = useTasksContext();

  const [searchParams] = useSearchParams();
  let statusSP = searchParams.get("status"); // status search param:
  // new tasks list array to view:
  const [list, setList] = useState();
  // filter all tasks with status & searchInput:
  useEffect(() => {
    const filterTasks = allTasks.filter((t) => {
      let matchStatus = statusSP
        ? t.status.toLowerCase() === statusSP.toLowerCase()
        : true;
      let matchSearch = searchInput
        ? t.content?.toLowerCase().startsWith(searchInput.toLowerCase())
        : true;
      return matchStatus && matchSearch;
    });
    setList(filterTasks);
  }, [allTasks, searchInput, statusSP]);

  return (
    <ul className="tasks-list">
      {list?.length <= 0 ? (
        <NoResults msg="No tasks found with that title. Try a different keyword"/>
      ) : (
        list?.map((task) => <TasksIndex.TaskRow key={task._id} task={task} />)
      )}
    </ul>
  );
}

export default React.memo(TasksList);
