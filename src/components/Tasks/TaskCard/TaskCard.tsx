import React from "react";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import { deleteTask } from "../../../service/task";
import { Task } from "../../../types/board";
import { Status } from "../../../types/status";
import "./TaskCard.css";
import { Divider } from "@mui/material";

export interface TaskCardProps {
  task: Task;
  boardId: string;
}
export const TaskCard: React.FC<TaskCardProps> = ({ boardId, task }) => {
  if (!task) {
    return null;
  }
  return (
    <div
      className="TaskCard"
      style={{
        borderLeft: `3px solid ${getCardBorderColor(task.status)}`,
      }}
    >
      <div className="TaskCardHeader">
        <div> {task.name}</div>
        <button
          className="TaskDeleteButton"
          title="Delete task"
          onClick={() => {
            deleteTask(task.id, boardId);
          }}
        >
          <DeleteForeverOutlined></DeleteForeverOutlined>
        </button>
      </div>
      <Divider variant="middle"></Divider>
      <div className="TaskCardContent" title={task.description}>
        {task.description}
      </div>
      <div className="TaskCardFooter">
        <div title={task.createdBy} className="TaskFooterOwner">
          {task.createdBy?.substr(0, 1).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const getCardBorderColor = (status: Status) => {
  switch (status) {
    case Status.NotStarted:
      return "red";
    case Status.InProgress:
      return "cornflowerblue";
    case Status.Finished:
      return "limegreen";
    default:
      return "red";
  }
};
