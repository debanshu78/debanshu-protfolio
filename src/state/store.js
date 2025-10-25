import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import skillsReducer from "./slice/skillsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
  },
});