import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryProvider } from "./providers/QueryProvider";
import './App.css'

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;

