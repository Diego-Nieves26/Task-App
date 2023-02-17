import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../store/slices/option.slice";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import "./styles.css";
import { createTask, updateTask } from "../../store/slices/tasks.slice";
import { motion } from "framer-motion";
import { setSelectedTask } from "../../store/slices/selectedTask.slice";

const FormTask = () => {
  const option = useSelector((state) => state.option);
  const selectedTask = useSelector((state) => state.selectedTask);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTask !== null) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description,
        importance: selectedTask.importance,
      });
    }
  }, [reset, selectedTask]);

  const create = (e) => {
    dispatch(setOption(null));
    dispatch(createTask(e));
  };

  const update = (e) => {
    dispatch(updateTask(selectedTask.id, e));
    dispatch(setOption(null));
    dispatch(setSelectedTask(null));
  };
  return (
    <motion.div
      className="formTask"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {option === "create" && (
        <motion.div
          className="formTask__form formTask__form"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="title">Crear Tarea</h2>
          <button
            className="btn__secondary userMenu__button"
            onClick={() => dispatch(setOption(null))}
          >
            <i className="bx bx-x"></i>
          </button>
          <form className="form" onSubmit={handleSubmit(create)}>
            <div>
              <label className="form__div--label">Nombre</label>
              <input
                className="form__div--input"
                type="text"
                {...register("title")}
              />
            </div>
            <div>
              <label className="form__div--label">Descripcion</label>
              <input
                className="form__div--input"
                type="text"
                {...register("description")}
              />
            </div>
            <select className="form__div--input" {...register("importance")}>
              <option value="importante">Importante</option>
              <option value="noImportante">No tan importante</option>
            </select>
            <button className="btn">Crear tarea</button>
          </form>
        </motion.div>
      )}
      {option === "update-form" && (
        <motion.div
          className="formTask__form formTask__form"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="title">Actualizar Tarea</h2>
          <button
            className="btn__secondary userMenu__button"
            onClick={() => dispatch(setOption(false))}
          >
            <i className="bx bx-x"></i>
          </button>
          <form className="form" onSubmit={handleSubmit(update)}>
            <div>
              <label className="form__div--label">Nombre</label>
              <input
                className="form__div--input"
                type="text"
                {...register("title")}
              />
            </div>
            <div>
              <label className="form__div--label">Descripcion</label>
              <input
                className="form__div--input"
                type="text"
                {...register("description")}
              />
            </div>
            <select className="form__div--input" {...register("importance")}>
              <option value="importante">Importante</option>
              <option value="noImportante">No tan importante</option>
            </select>
            <button className="btn">Actualizar tarea</button>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FormTask;
