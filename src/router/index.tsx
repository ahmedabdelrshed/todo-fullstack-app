import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorHandler from "../errors/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRouter from "../auth/ProtectedRouter";
import HomePage from "../pages/HomePage";
const isAllowed = false;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRouter isAllowed={isAllowed} redirectPath="/login">
              <HomePage />
            </ProtectedRouter>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRouter
              data={{ name: "ahmed" }}
              isAllowed={!isAllowed}
              redirectPath="/"
            >
              <Login />
            </ProtectedRouter>
          }
        />
        <Route path="register" element={<Register />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
