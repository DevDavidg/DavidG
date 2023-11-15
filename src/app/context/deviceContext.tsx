'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'm-device' | 'desk';

export const DeviceContext = createContext<DeviceType | undefined>(undefined);

export const DeviceProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [device, setDevice] = useState<DeviceType>('desk');

  useEffect(() => {
    const getDeviceType = (): DeviceType => {
      const width = window.innerWidth;

      if (width <= 768) {
        return 'mobile';
      } else if (width <= 1024) {
        return 'm-device';
      } else {
        return 'desk';
      }
    };

    const handleResize = () => {
      setDevice(getDeviceType());
    };

    setDevice(getDeviceType());

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};

export const useDevice = (): DeviceType => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice debe ser usado dentro de un DeviceProvider');
  }
  return context;
};
