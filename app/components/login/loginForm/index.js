"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Hook de Next.js para redirección
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(""); // Estado para mostrar errores
  const router = useRouter(); // Hook de Next.js para redirigir al usuario

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Enviar las credenciales al backend para login
    try {
      // Realizamos la solicitud POST al endpoint de login de la API
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST", // Indicamos que es una solicitud POST
        headers: {
          "Content-Type": "application/json", // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify({ username: email, password: password }), // Cuerpo de la solicitud con email y password
      });

      const data = await response.json(); // Parseamos la respuesta a JSON

      if (response.ok) {
        // Si la respuesta fue exitosa, almacenamos el ID y otros datos en el localStorage
        const usuario = {
          id: data.result.id, // Guardamos solo el ID
          username: data.result.username,
          first_name: data.result.first_name,
          last_name: data.result.last_name,
        };

        localStorage.setItem("usuario", JSON.stringify(usuario)); // Almacenamos el usuario completo en el localStorage
        alert("Inicio de sesión exitoso!");
        router.push("/view/listadoDeEventos"); // Redirigir al usuario a otra página
      } else {
        // Si hubo un error, mostramos el mensaje de error
        setError(data.message || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("Error al conectarse al servidor.");
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>} {/* Mostrar error si existe */}
      <div className={styles["form-group"]}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualizar email
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualizar contraseña
          required
        />
      </div>
      <button type="submit" className={styles["login-button"]}>
        Ingresar
      </button>
    </form>
  );
};

export default LoginForm;
