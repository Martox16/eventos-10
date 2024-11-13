"use client";  // Aseguramos que este código solo se ejecute del lado del cliente
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DetalleDeEvento from '../../components/detalleDeEvento/DetalleEvento/index.js';

export default function Page() {
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem("usuario");

    // Si no hay usuario autenticado, redirigir a la página de login
    if (!user) {
      router.push("/view/login"); // Redirige al login si no hay usuario
    }
  }, [router]);
  return <DetalleDeEvento />;
}
