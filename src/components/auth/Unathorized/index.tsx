import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/atomic-design";
const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 max-w-md w-full text-center space-y-6 border border-red-200"
      >
        {/* Icono con animación */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full shadow-lg"
        >
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </motion.div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-red-700">Sin permisos</h1>
        <p className="text-base text-gray-600">
          No tienes permisos para acceder a esta página.
        </p>

        {/* Mensaje adicional */}
        <p className="text-sm text-gray-500">
          Si crees que esto es un error, por favor contacta a tu administrador
          de sistema.
        </p>

        {/* Acción */}
        <div className="pt-4">
          <Button
            variant="destructive"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
            onClick={() => (window.location.href = "/")}
          >
            Volver a la página de inicio
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
