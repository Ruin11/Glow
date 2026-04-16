import React, { createContext, useContext, useState } from 'react';

export type Role = 'Cliente' | 'Profesional' | 'Proveedor';

interface RoleContextData {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextData>({
  role: 'Cliente',
  setRole: () => {},
});

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app this might be initialized from AsyncStorage or Firebase
  const [role, setRole] = useState<Role>('Cliente');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
