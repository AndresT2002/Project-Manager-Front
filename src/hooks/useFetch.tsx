import { useState } from "react";

const useFetch = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    url: string,
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: Error | null; loading: boolean }> => {
    setLoading(true);

    try {
      // Función para obtener token desde un endpoint seguro
      const getAccessToken = async () => {
        try {
          // Endpoint que lee la cookie httpOnly y devuelve el token
          const response = await fetch("/api/auth/get-token", {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            return data.accessToken || null;
          }
        } catch (error) {}
        return null;
      };

      const accessToken = await getAccessToken();
      // Preparar headers con token si existe
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };

      // Agregar token de autorización si existe
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      // Crear opciones finales
      const finalOptions: RequestInit = {
        ...options,
        headers,
        credentials: "include", // Importante para enviar cookies
      };

      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`;
      const response = await fetch(backendUrl, finalOptions);

      // Si el token expiró (401), intentar refrescar
      if (response.status === 401 && accessToken) {
        // Aquí podrías implementar lógica para refrescar el token
        // Por ahora, simplemente devolver el error
      }

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        // Si no es JSON válido, crear un objeto de error
        responseData = {
          error: "Respuesta no válida del servidor",
          status: response.status,
        };
      }

      // Si la respuesta no es exitosa, tratar como error
      if (!response.ok) {
        const error = new Error(
          responseData.error || responseData.message || "Error en la petición"
        );
        setError(error);
        return { data: null, error, loading: false };
      }

      setData(responseData);
      setError(null);
      return { data: responseData, error: null, loading: false };
    } catch (error) {
      const fetchError = error as Error;
      setError(fetchError);
      return { data: null, error: fetchError, loading: false };
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export { useFetch };
