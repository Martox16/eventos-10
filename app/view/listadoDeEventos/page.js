"use client";  // Aseguramos que este código solo se ejecute del lado del cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation";  // Para redirigir
import ListadoDeEventos from "../../components/listadoDeEventos/listadoDeEventos";

// Datos de ejemplo de los eventos
const eventos = [
  { id: 1, title: "Evento 1", description: "Descripción 1", date: "2024-11-01" },
  { id: 2, title: "Evento 2", description: "Descripción 2", date: "2024-11-02" },
  { id: 3, title: "Evento 3", description: "Descripción 3", date: "2024-11-03" },
];

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem("usuario");

    // Si no hay usuario autenticado, redirigir a la página de login
    if (!user) {
      router.push("/view/login"); // Redirige al login si no hay usuario
    }
  }, [router]); // Dependencia de router para que se ejecute la redirección cuando sea necesario

  // Si el usuario está autenticado, muestra la página de eventos
  return (
    <div>
      <ListadoDeEventos events={eventos} />
    </div>
  );
}
