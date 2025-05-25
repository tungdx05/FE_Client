import { useEffect } from 'react';
import { useCountStore } from './stores/common.store';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import RegisterForm from './components/auth/RegisterForm';  // import thêm
import './App.css';

function App() {
  const { count: countFromStore } = useCountStore();

  useEffect(() => {
    // code nếu cần
  }, []);

  return (
    <>
      {/* Nếu muốn dùng Router */}
      <RouterProvider router={router} />

      {/* Hoặc nếu muốn hiển thị RegisterForm luôn */}
      {/* <RegisterForm /> */}
    </>
  );
}

export default App;
