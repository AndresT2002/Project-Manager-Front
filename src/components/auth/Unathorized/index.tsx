import { AlertTriangle } from "lucide-react";

const Unathorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary">Unathorized</h1>
        <p className="text-sm text-text-secondary">
          You are not authorized to access this page
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs text-text-tertiary">
          If you think this is an error, contact the administrator of the
          system.
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs text-text-tertiary">
          If you think this is an error, contact the administrator of the
          system.
        </p>
      </div>
    </div>
  );
};

export default Unathorized;
