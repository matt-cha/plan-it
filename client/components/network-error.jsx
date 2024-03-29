import React, { createContext, useContext, useState, useEffect } from 'react';

const NetworkErrorContext = createContext();

export const NetworkErrorProvider = ({ children }) => {
  const [networkError, setNetworkError] = useState(false);
  useEffect(() => {
    if (networkError) {
      window.alert('Sorry, there was an error connecting to the network! Please check your internet connection and try again.');
    }
  }, [networkError]);
  return (
    <NetworkErrorContext.Provider value={{ networkError, setNetworkError }}>
      {children}
    </NetworkErrorContext.Provider>
  );
};

/* export const useNetworkError = () => useContext(NetworkErrorContext); */
export const useNetworkError = () => {
  const { networkError, setNetworkError } = useContext(NetworkErrorContext);
  /*   console.log('networkError', networkError);
  console.log('setNetworkError', setNetworkError); */
  return { networkError, setNetworkError };
};
