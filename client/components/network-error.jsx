import React, { createContext, useContext, useState } from 'react';

const NetworkErrorContext = createContext();

export const NetworkErrorProvider = ({ children }) => {
  const [networkError, setNetworkError] = useState(false);

  return (
    <NetworkErrorContext.Provider value={{ networkError, setNetworkError }}>
      {children}
      {networkError && <div>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</div>}
    </NetworkErrorContext.Provider>
  );
};

export const useNetworkError = () => useContext(NetworkErrorContext);
