import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOption } from "../../store/slices/option.slice";
import "./styles.css";
import { filterTasksTwo } from "../../store/slices/tasks.slice";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const name = localStorage.getItem("name");
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.screen.width >= 1300) {
      setShowMenu(true);
    }
  }, []);

  const closeSession = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("name", "");
  };

  const changeOption = (option) => {
    if (window.screen.width <= 1300) {
      setShowMenu(false);
    }
    switch (option) {
      case "create":
        dispatch(setOption(option));
        break;
      case "delete":
        dispatch(setOption(option));
        break;
      case "update":
        dispatch(setOption(option));
        break;
      default:
        break;
    }
  };

  const filterTasks = (e) => {
    if (window.screen.width <= 1300) {
      setShowMenu(false);
    }
    dispatch(filterTasksTwo(e.target.value));
  };

  return (
    <section className="menu">
      <button
        className="btn__secondary menu__button btn__secondary--large"
        onClick={() => setShowMenu(true)}
      >
        <i className="bx bx-menu"></i>
      </button>
      <div className="userMenu" style={{ left: showMenu ? "0" : "-100%" }}>
        <h1 className="title">ToDo App</h1>
        <button
          className="btn__secondary userMenu__button userMenu__button--none"
          onClick={() => setShowMenu(false)}
        >
          <i className="bx bx-x"></i>
        </button>
        <div className="container">
          <h2>Bienvenid@ {name.toUpperCase()}</h2>
          <div className="container__div">
            <button
              className="btn container__div--button"
              onClick={() => changeOption("create")}
            >
              Crear Nueva Tarea
            </button>
            <button
              className="btn container__div--button"
              onClick={() => changeOption("delete")}
            >
              Eliminar Tarea
            </button>
            <button
              className="btn container__div--button"
              onClick={() => changeOption("update")}
            >
              Actualizar Tarea
            </button>
            <select
              className="btn container__div--button"
              onChange={filterTasks}
            >
              <option value="all">Todas</option>
              <option value="noImportante">Poco Importantes</option>
              <option value="importante">Importantes</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
          <button
            className="btn__secondary container__button"
            onClick={closeSession}
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserMenu;
