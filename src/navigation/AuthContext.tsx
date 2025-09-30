// AuthContext.tsx
import React, {createContext, useContext} from 'react';

export const AuthContext = createContext({
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);
