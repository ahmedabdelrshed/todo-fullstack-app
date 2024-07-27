import { RouterProvider } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import router from "./router";

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
};

export default App;
