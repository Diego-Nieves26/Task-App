import { UserMenu, Login, Message, FormTask, TaskList } from "./components";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./App.css";

function App() {
  const option = useSelector((state) => state.option);
  const [showLogin, setShowLogin] = useState(false);
  const token = localStorage.getItem("token");

  const changeShowLogin = (x) => {
    setShowLogin(x);
  };

  return (
    <div className="App">
      <Message />
      <Login showLogin={showLogin} changeShowLogin={changeShowLogin} />

      {option === "create" && <FormTask />}
      {option === "update-form" && <FormTask />}
      {token ? (
        <>
          <UserMenu />
          <TaskList />
        </>
      ) : (
        <div className="message" style={{ background: "#000" }}>
          <p className="message__p--initial">
            Hola! Inicia sesion para poder continuar
            <button className="btn" onClick={() => changeShowLogin(true)}>
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
