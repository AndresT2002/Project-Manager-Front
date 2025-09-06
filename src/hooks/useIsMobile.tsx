"use client";

import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  width: number;
  height: number;
}

const useIsMobile = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isMobileOrTablet: false,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Función para actualizar el estado del dispositivo
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const isMobileOrTablet = width < 1024;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isMobileOrTablet,
        width,
        height,
      });
    };

    // Actualizar inmediatamente
    updateDeviceInfo();

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", updateDeviceInfo);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

export { useIsMobile };
export type { DeviceInfo };
