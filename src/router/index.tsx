import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorHandler from "../errors/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<Layout />} errorElement={<ErrorHandler />} >
      <Route
          index
          element={
           <h2>Home</h2>
          }
        />

      </Route>

      {/* 404 Page */}
      <Route path="*" element={<PageNotFound/>} />
    </>
  )
);

export default router;
