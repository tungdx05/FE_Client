import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../components/client/ClientLayout";
import HomePage from "../components/common/HomePage";
import RegisterForm from "../components/auth/RegisterForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
  path: "/client",
  element: <ClientLayout />,
},
  {
    path: "/register",
    element: <RegisterForm />,
  },
  
]);

export default router;
