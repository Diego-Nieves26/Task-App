import { openModal } from "../../store/slices/modal.slice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import "./styles.css";

const API = "http://192.168.100.41:4000/api/v1/users/";

const Login = ({ showLogin, changeShowLogin }) => {
  const { register, handleSubmit, reset } = useForm();
  const [newUser, setNewUser] = useState(false);
  const dispatch = useDispatch();

  const createUser = (e) => {
    axios
      .post(API, e)
      .then(() => dispatch(openModal("Cuenta creada, inicia sesion")))
      .catch(() => dispatch(openModal("Revisa todos los campos")));
  };

  const login = (e) => {
    axios
      .post(`${API}login`, e)
      .then((res) => {
        dispatch(openModal("Sesion iniciada"));
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => dispatch(openModal("Credenciales invalidas")));
  };

  const changeForm = (key) => {
    reset({
      email: "",
      password: "",
      name: "",
    });

    setNewUser(key);
  };

  return (
    <section className="Login" style={{ right: showLogin ? "0" : "-100%" }}>
      <button
        className="btn__secondary btn__secondary--large"
        onClick={() => changeShowLogin(false)}
      >
        <i className="bx bx-left-arrow-alt"></i>
      </button>
      <h1 className="title">Todo App</h1>
      {newUser ? (
        <>
          <form className="form" onSubmit={handleSubmit(createUser)}>
            <div className="form__div">
              <label className="form__div--label" htmlFor="name">
                Nombre
              </label>
              <input
                className="form__div--input"
                type="text"
                id="name"
                {...register("name")}
              />
            </div>
            <div className="form__div">
              <label className="form__div--label" htmlFor="email">
                Email
              </label>
              <input
                className="form__div--input"
                type="email"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="form__div">
              <label className="form__div--label" htmlFor="password">
                Contraseña
              </label>
              <input
                className="form__div--input"
                type="password"
                id="password"
                {...register("password")}
              />
            </div>
            <button className="btn">Crear Cuenta</button>
          </form>
          <div className="login__div">
            Ya tienes una cuenta{" "}
            <span
              className="login__div--span"
              onClick={() => changeForm(false)}
            >
              Inicia Sesion
            </span>
          </div>
        </>
      ) : (
        <>
          <form className="form" onSubmit={handleSubmit(login)}>
            <div className="form__div">
              <label className="form__div--label" htmlFor="email">
                Email
              </label>
              <input
                className="form__div--input"
                type="email"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="form__div">
              <label className="form__div--label" htmlFor="password">
                Contraseña
              </label>
              <input
                className="form__div--input"
                type="password"
                id="password"
                {...register("password")}
              />
            </div>
            <button className="btn">Iniciar</button>
          </form>
          <div className="login__div">
            No tienes una cuenta{" "}
            <span className="login__div--span" onClick={() => changeForm(true)}>
              Registrate
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default Login;
