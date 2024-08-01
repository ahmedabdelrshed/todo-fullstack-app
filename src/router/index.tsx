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
import TodosPage from "../pages/TodosPage";
const userDataString = localStorage.getItem("userData");
const userData = userDataString ? JSON.parse(userDataString) : null;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRouter isAllowed={userData?.jwt} redirectPath="/login">
              <HomePage />
            </ProtectedRouter>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRouter isAllowed={userData?.jwt} redirectPath="/login">
              <h2>Profile Page</h2>
            </ProtectedRouter>
          }
        />
        <Route
          path="todos"
          element={
            <ProtectedRouter isAllowed={userData?.jwt} redirectPath="/login">
              <TodosPage/>
            </ProtectedRouter>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRouter
              data={{ name: "ahmed" }}
              isAllowed={!userData?.jwt}
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
