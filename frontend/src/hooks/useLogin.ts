import { useState } from "react";
import { API_BASE_URL } from "../config";

// Definimos la interfaz para la respuesta de la API
interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data: LoginResponse = await response.json();
      console.log("DATA: " + data);

      if (data.success) {
        // Guardar el token JWT en localStorage o sessionStorage
        localStorage.setItem("token", data.token || ""); // Guarda el token para usarlo después
        alert("Login exitoso");
      } else {
        setError(data.message || "Error en la solicitud de inicio de sesión");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error en la solicitud de inicio de sesión");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
