import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "../config";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL, // Cambia a tu URL del backend si es diferente
});

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response: AxiosResponse) => response, // Si la respuesta es exitosa, devuélvela tal cual
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Si obtenemos un 401, el token ha expirado o es inválido
      localStorage.removeItem("accessToken"); // Limpiar token
      localStorage.removeItem("selectedSite"); // 💥 borra el sitio al cerrar sesión
      window.location.href = "/login"; // Redirigir a la página de login
    }
    return Promise.reject(error); // Rechaza la promesa con el error
  }
);
