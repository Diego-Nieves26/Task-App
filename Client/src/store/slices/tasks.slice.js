import { createSlice } from "@reduxjs/toolkit";
import getConfig from "../../utils/getConfig";
import axios from "axios";
import { openModal } from "./modal.slice";

const API = "http://192.168.100.41:4000/api/v1/tasks/";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => action.payload,
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;

export const getAllTasks = () => (dispatch) => {
  return axios
    .get(API, getConfig())
    .then((res) => dispatch(setTasks(res.data.tasks)));
};

export const createTask = (info) => (dispatch) => {
  return axios
    .post(API, info, getConfig())
    .then(() => dispatch(getAllTasks()))
    .finally(() => dispatch(openModal("Tarea creada")));
};

export const deleteTask = (taskId) => (dispatch) => {
  return axios
    .delete(`${API + taskId}`, getConfig())
    .then(() => dispatch(getAllTasks()))
    .finally(() => dispatch(openModal("Tarea eliminda")));
};

export const updateTask = (taskId, info) => (dispatch) => {
  return axios
    .patch(`${API + taskId}`, info, getConfig())
    .then(() => dispatch(getAllTasks()))
    .finally(() => dispatch(openModal("Tarea actualizada")));
};

export const filterTasksTwo = (key) => (dispatch) => {
  if (key === "all") {
    dispatch(getAllTasks());
  } else {
    return axios.get(`${API + key}`, getConfig()).then((res) => {
      dispatch(setTasks(res.data.tasks || res.data.tasksCompleted));
    });
  }
};

export const checkedTask = (id) => (dispatch) => {
  return axios
    .patch(`${API}checked/${id}`, {}, getConfig())
    .then(() => dispatch(getAllTasks()))
    .finally(() => dispatch(openModal("Felicidades comlpetaste una tarea")));
};
