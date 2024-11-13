"use client";  // Aseguramos que este código solo se ejecute del lado del cliente

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Borrar o resetear el localStorage cuando se acceda a la página
    localStorage.removeItem('usuario');  // Eliminar el usuario del localStorage
    router.push('/view/login');
  }, [router]);

  return (
    <div>
      <p>Redirigiendo a la página de login...</p>
    </div>
  );
}
