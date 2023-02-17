import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAllTasks } from "../../store/slices/tasks.slice";
import Card from "../Card/Card";
import "./style.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <div className="taskList">
      {tasks.length === 0 ? (
        <div className="message message--center" style={{ background: "#000" }}>
          <p className="message__p--initial">No hay tareas para mostrar</p>
        </div>
      ) : (
        tasks.map((task) => (
          <Card
            task={task}
            key={task.id}
            color={
              task.importance === "importante"
                ? "rgb(111, 255, 0)"
                : task.importance === "completed"
                ? "#c2c2c2"
                : "rgb(0, 167, 255)"
            }
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
