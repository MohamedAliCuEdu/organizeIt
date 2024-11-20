import React, { useEffect, useState, createContext } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosGetData from "../hooks/useAxiosGetData";
import usePrivateAxios from "../hooks/usePrivateAxios";
import usePopupContext from "../hooks/usePopupContext";

const TasksContext = createContext({});

export function TasksProvider({ children }) {
  const { auth } = useAuth();
  const URL = `tasks/${auth?.userInfo.userId}/`;
  const axiosPrivateApi = usePrivateAxios();
  const { handleErrMsg } = usePopupContext();

  // all task & tasks stats:
  const [allTasks, setAllTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({});
  // fetch all user's tasks & task stats:
  const { data, isLoading, fetchDataErr } = useAxiosGetData({
    axiosInstance: axiosPrivateApi,
    url: URL,
  });
  // update all tasks state
  useEffect(() => {
    console.log("F")
    setAllTasks(data);
  }, [data]);
  // update all tasks status stats:
  useEffect(() => {
    if (allTasks?.length > 0) {
      let completedCount = allTasks.filter(
        (task) => task.status === "completed"
      ).length;
      let progressCount = allTasks.filter(
        (task) => task.status === "progress"
      ).length;
      let pendingCount = allTasks.filter(
        (task) => task.status === "pending"
      ).length;
      setTaskStats({
        completed: completedCount,
        progress: progressCount,
        pending: pendingCount,
        total: allTasks.length,
      });
    } else {
      setTaskStats({});
    }
  }, [allTasks]);

  // states:
  const [addTaskPending, setAddTaskPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [taskEdit, setTaskEdit] = useState(false); // view task edit popup
  const [currentTask, setCurrentTask] = useState({}); // task update

  // handle search input value:
  const handleSearchInput = (val) => {
    setSearchInput(val);
  };
  // handle Task editing Section view:
  const handleTaskEditView = (taskId) => {
    if (taskId) {
      setTaskEdit(true);
      let foundTask = allTasks.find((task) => task._id === taskId);
      foundTask ? setCurrentTask(foundTask) : setTaskEdit(false);
    } else {
      setTaskEdit(false);
      setCurrentTask({});
    }
  };
  // handle current task change:
  const handleCurrentTask = (e) => {
    let { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };
  // tasks api requests:
  // 1) add new task:
  const addTaskApi = async (e, content) => {
    e.preventDefault();
    try {
      setAddTaskPending(true);
      const res = await axiosPrivateApi.post(URL, { content });
      setAllTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to add task!");
    } finally {
      setAddTaskPending(false);
    }
  };
  // 2) update task:
  const updateTaskApi = async (e, taskId) => {
    e.preventDefault();
    try {
      // check for taskId:
      // if exist then its for check task
      // not exist so we will use currentTask
      if (taskId) {
        await axiosPrivateApi.patch(URL + taskId + "/checked");
        let allUpdated = allTasks.map((task) =>
          task._id === taskId ? { ...task, checked: !task.checked } : task
        );
        setAllTasks(allUpdated);
      } else {
        await axiosPrivateApi.put(URL + currentTask._id, {
          content: currentTask.content,
          status: currentTask.status,
        });
        let allUpdated = allTasks.map((task) =>
          task._id === currentTask._id ? currentTask : task
        );
        setAllTasks(allUpdated);
      }
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to save changes!");
    }
  };
  // 3) delete task:
  const deleteTaskApi = async (taskId) => {
    try {
      // make a delete request api:
      await axiosPrivateApi.delete(URL + taskId);
      // filter tasks:
      setAllTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete task!");
    }
  };

  return (
    <TasksContext.Provider
      value={{
        isLoading,
        fetchDataErr,
        allTasks,
        taskStats,
        searchInput,
        handleSearchInput,
        addTaskApi,
        addTaskPending,
        taskEdit,
        handleTaskEditView,
        currentTask,
        handleCurrentTask,
        deleteTaskApi,
        updateTaskApi,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksContext;
