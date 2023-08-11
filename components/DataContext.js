import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sharedItems, setSharedItems] = useState([]);

  return (
    <DataContext.Provider value={{ sharedItems, setSharedItems }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};


// Compare this snippet from Maps.js & AllitemAllPages.js