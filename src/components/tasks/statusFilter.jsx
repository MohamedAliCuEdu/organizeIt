import React from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import useTasksContext from "../../hooks/useTasksContext";

function StatusFilter() {
  const { taskStats } = useTasksContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const statusSP = searchParams.get("status"); // task status search param:

  // handle status search param:
  const handleStatusSP = (status) => {
    status ? searchParams.set("status", status) : searchParams.delete("status");
    setSearchParams(searchParams);
  };

  return (
    <div className="status-filter filter-btns">
      <button onClick={() => handleStatusSP("")} className="dark-btn sm-btn">
        all
        {taskStats?.total > 0 && (
          <span className="count">{taskStats?.total}</span>
        )}
      </button>
      <button
        onClick={() => handleStatusSP("pending")}
        className={classNames("white-gray-btn dark-hover sm-btn", {
          active: statusSP === "pending",
        })}
      >
        pending
        {taskStats?.pending > 0 && (
          <span className="count">{taskStats?.pending}</span>
        )}
      </button>
      <button
        onClick={() => handleStatusSP("progress")}
        className={classNames("white-gray-btn dark-hover sm-btn", {
          active: statusSP === "progress",
        })}
      >
        progress
        {taskStats?.progress > 0 && (
          <span className="count">{taskStats?.progress}</span>
        )}
      </button>
      <button
        onClick={() => handleStatusSP("completed")}
        className={classNames("white-gray-btn dark-hover sm-btn", {
          active: statusSP === "completed",
        })}
      >
        completed
        {taskStats?.completed > 0 && (
          <span className="count">{taskStats?.completed}</span>
        )}
      </button>
    </div>
  );
}
export default StatusFilter;
