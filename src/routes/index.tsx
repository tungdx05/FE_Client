import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../components/layouts/ClientLayout";
import HomePage from "../components/common/HomePage";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <div>Trang sản phẩm</div> },
      { path: "about", element: <div>Trang giới thiệu</div> },
      { path: "contact", element: <div>Trang liên hệ</div> },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
 feature/login

  {
  path: "/forgot-password",
  element: <ForgotPasswordForm />,
},
 develop
]);

export default router;
