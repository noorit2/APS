import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AppRoutes } from "./routes/AppRoutes.js";

function App() {
  const router = createBrowserRouter(
    AppRoutes
   );
  return (
      <RouterProvider router={router}>
      </RouterProvider>
  );
}

export default App;
