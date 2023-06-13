// AuthContext.js
import React, { createContext, useState } from 'react';
import { supabase } from '../../supabaseClient.js';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

    React.useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
