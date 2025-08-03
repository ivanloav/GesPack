import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import { ScreenLayout } from "./components/layout/MainScreenLayout";
import { LoginForm } from "./components/login/loginForm";
import { Dashboard } from "./components/dashboard/dashboard";
import { useEffect } from "react";
import { checkTokenExpiration } from "./services/checkTokenExpiration";

function App() {
  document.title = "Iniciar Sesión - GesPack";

  // Llama a checkTokenExpiration cuando el componente App se monte
  useEffect(() => {
    checkTokenExpiration(); // Verifica la expiración del token
  }, []); // El array vacío significa que esto solo se ejecuta al montar el componente

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        {/*<Route path="/dashboard" element={<Dashboard />} />*/}
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<ScreenLayout />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            {/*
            <Route path="/user/inventario" element={<Inventario />} />
            <Route path="/user/Products" element={<Products />} />
            <Route path="/user/orders" element={<Orders />} />
          */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
