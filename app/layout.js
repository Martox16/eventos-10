"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Importa useRouter para redirección
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter(); // Hook de redirección

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario')); // Cargar el usuario desde localStorage
    if (usuario) {
      setUser(usuario);  // Guardar el usuario en el estado
    }
  }, []);  // Solo se ejecuta una vez al montar el componente

  const handleLogout = () => {
    localStorage.removeItem('usuario');  // Eliminar usuario del localStorage
    setUser(null);  // Limpiar el estado de usuario
    router.push('/view/login');  // Redirigir al login
  };

  return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <header className={styles.header}>
            <div className={styles.logo}>
              <Image src="/img/logo.png" alt="Logo del sitio" width={150} height={50} />
            </div>
            <nav className={styles.nav}>
              <Link href="/">Home</Link>
              <Link href="/contacto">Contacto</Link>
              {user && (  // Verificamos si el usuario está autenticado
                <div className={styles.userInfo}>
                  {/* Mostramos el nombre completo del usuario */}
                  <span>Hola, {user.first_name} {user.last_name}</span>
                  <button onClick={handleLogout}>Cerrar sesión</button>  {/* Llamamos a handleLogout al hacer click */}
                </div>
              )}
            </nav>
          </header>
          <main>{children}</main>
          <footer className={styles.footer}>© Sitio De Eventos</footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
