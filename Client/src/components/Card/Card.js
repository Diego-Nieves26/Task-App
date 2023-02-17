import { deleteTask } from "../../store/slices/tasks.slice";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../store/slices/option.slice";
import { setSelectedTask } from "../../store/slices/selectedTask.slice";
import React from "react";
import { checkedTask } from "../../store/slices/tasks.slice";
import "./styles.css";

const Card = ({ task, color }) => {
  const option = useSelector((state) => state.option);
  const dispatch = useDispatch();

  const selectTask = () => {
    dispatch(setOption("update-form"));
    dispatch(setSelectedTask(task));
  };

  return (
    <div className="message" style={{ background: color }}>
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        style={{
          opacity: option === "delete" ? "1" : "0",
          display: task.importance === "completed" && "none",
        }}
        className="message__trash"
      >
        <i className="bx bx-trash"></i>
      </button>
      <button
        onClick={selectTask}
        style={{
          opacity: option === "update" ? "1" : "0",
          display: task.importance === "completed" && "none",
        }}
        className="message__pencil"
      >
        <i className="bx bx-pencil"></i>
      </button>
      <h2 className="message__title">{task.title}</h2>
      <p className="message__p">{task.description}</p>
      <button
        className="message__check"
        onClick={() => dispatch(checkedTask(task.id))}
        style={{ display: task.importance === "completed" && "none" }}
      >
        <i className="bx bx-check"></i>
      </button>
    </div>
  );
};

export default Card;
