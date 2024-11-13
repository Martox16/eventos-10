"use client";  // Asegurando que es un Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook de Next.js para redirección
import Link from 'next/link';  // Para enlace de redirección
import styles from './registroForm.module.css';

const RegistroForm = () => {
  const [firstName, setFirstName] = useState(''); // Estado para el primer nombre
  const [lastName, setLastName] = useState(''); // Estado para el apellido
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario (email)
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [error, setError] = useState(''); // Estado para mostrar errores
  const router = useRouter(); // Hook de Next.js para redirección

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

    // Validación básica de campos
    if (!firstName || !lastName || !username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const newUser = { first_name: firstName, last_name: lastName, username, password };

    try {
      // Realizamos la solicitud POST al endpoint de registro de la API
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST", // Indicamos que es una solicitud POST
        headers: {
          "Content-Type": "application/json", // Enviamos los datos como JSON
        },
        body: JSON.stringify(newUser), // Enviamos el objeto con los datos del nuevo usuario
      });

      // Verificar si la respuesta es exitosa (código de estado HTTP 2xx)
      if (!response.ok) {
        // Si la respuesta no es exitosa, obtenemos el mensaje de error de la respuesta
        const errorData = await response.json();
        setError(errorData.message || 'Hubo un problema al registrar el usuario.');
        return;
      }

      // Si la respuesta fue exitosa, manejamos la respuesta
      const data = await response.json();
      const usuario = {
        id: data.id || "No id", // Si la API no devuelve el id, usamos un valor por defecto
        first_name: firstName,
        last_name: lastName,
        username,
      };

      // Guardamos el usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario)); 

      // Alerta de éxito
      alert('Usuario registrado exitosamente!');

      // Redirigir al login una vez registrado exitosamente
      router.push('/view/login'); // Redirige a la página de login

    } catch (err) {
      // Capturamos cualquier error inesperado
      router.push('/view/login');
    }
  };

  return (
    <form className={styles['registro-form']} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>} {/* Mostrar mensaje de error si hay alguno */}
      <div className={styles['form-group']}>
        <label htmlFor="firstName">Nombre</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} // Actualizar el nombre
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="lastName">Apellido</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} // Actualizar el apellido
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="username">Correo electrónico (Username)</label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualizar el email como username
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualizar la contraseña
          required
        />
      </div>
      <button type="submit" className={styles['registro-button']}>
        Registrar
      </button>
      
      {/* Enlace para ir a la página de login */}
      <p className={styles['login-link']}>
        ¿Ya tienes una cuenta? <Link href="/view/login">Inicia sesión</Link>
      </p>
    </form>
  );
};

export default RegistroForm;
