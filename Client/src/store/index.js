import selectedTask from "./slices/selectedTask.slice";
import { configureStore } from "@reduxjs/toolkit";
import option from "./slices/option.slice";
import modal from "./slices/modal.slice";
import tasks from "./slices/tasks.slice";

export default configureStore({
  reducer: {
    selectedTask,
    option,
    modal,
    tasks,
  },
});
