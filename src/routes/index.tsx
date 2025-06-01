import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../components/layouts/ClientLayout";
import HomePage from "../components/common/HomePage";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ProfilePage from "../components/profile/ProfilePage";
import CartPage from "../pages/CartPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <div>Trang sản phẩm</div> },
      { path: "about", element: <div>Trang giới thiệu</div> },
      { path: "contact", element: <div>Trang liên hệ</div> },
       { path: "profile", element: <ProfilePage /> },
       { path: "cart", element: <CartPage/>},
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


  {
  path: "/forgot-password",
  element: <ForgotPasswordForm />,
},

]);

export default router;