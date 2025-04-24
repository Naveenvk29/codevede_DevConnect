import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

//
import Signup from "./page/auth/signup.jsx";
import Login from "./page/auth/login.jsx";
import ResetPassword from "./page/auth/ResetPassword.jsx";
import VerifyEmail from "./page/auth/VerifyEmail.jsx";
import ForgotPassword from "./page/auth/ForgotPassword.jsx";
import PrivateRoutes from "./page/user/PrivateRoutes.jsx";
import Profile from "./page/user/Profile.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
