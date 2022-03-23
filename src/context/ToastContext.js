import { createContext, useState, useCallback, useContext } from 'react';

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastParams, setToastParams] = useState({});
  
  // Set time that toast is visible
  const durationMilliseconds = 3000;

  // Call this function from any component when a toast message needs to be displayed. 
  const showToast = useCallback((type, message) => {
    setToastVisible(true);
    // Provide safe defaults if there is not message or type explicitly set
    setToastParams({
      type: type ? type : 'error',
      message: message ? message : '',
    })

    setTimeout(() => {
      setToastVisible(false);
    }, durationMilliseconds)
  }, []);

  return (
    // showToast is the main part of the context value that needs to be accessible by all components. The other two values are used by the Toast component in App.js only
    <ToastContext.Provider value={{ showToast, toastVisible, toastParams }}>
      { children }
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext);

  // Can add conditional here to ensure toast context is used only by those components wrapped in a toast context provider

  return context;
}