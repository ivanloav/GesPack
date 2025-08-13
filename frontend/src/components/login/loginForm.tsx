import React, { useState } from "react"; // Importa los hooks useState de React
import { useNavigate, useLocation } from "react-router-dom"; // Importa los hooks useNavigate y useLocation de React Router
import { API_BASE_URL } from "../../config"; // Importa la URL base de la API
import "./loginForm.css"; // Importa los estilos del componente LoginForm

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      const form = event.target as HTMLFormElement;
      const email = form.elements.namedItem("email") as HTMLInputElement;
      const password = form.elements.namedItem("password") as HTMLInputElement;

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/user/dashboard");
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error en la solicitud de inicio de sesión");
      }
      setIsLoading(false);
    }, 1000);
  }
  return (
    <div className="login-container">
      <div className="login-root">
        <div className="container">
          {isLoading && (
            <div className="loadingOverlay">
              <div className="spinner"></div>
            </div>
          )}
          <img src="images/GesPack.png" alt="Logo" className="logo" />
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <form className="formLogin" onSubmit={handleLogin}>
            <div className="inputsButtonContainer">
              <h1>Iniciar sesión</h1>
              <input
                name="email"
                className="client"
                placeholder="Correo electrónico"
                type="email"
                style={{ borderColor: error ? "red" : "default" }}
                required
              />
              <input
                name="password"
                type="password"
                style={{ borderColor: error ? "red" : "default" }}
                placeholder="Password"
                required
              />
              <button type="submit">🔑&nbsp;&nbsp;&nbsp;Login</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
