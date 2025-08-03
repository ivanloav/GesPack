import { jwtDecode, JwtPayload } from "jwt-decode"; // Importar el tipo JwtPayload para tipar la decodificación

export const checkTokenExpiration = (): void => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token); // Tipado del token decodificado
    const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // El token ha expirado
      localStorage.removeItem("token"); // Limpia el token
      window.location.href = "/login"; // Redirige al login
    }
  }
};
