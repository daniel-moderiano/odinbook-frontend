import { useCallback, useState } from "react"

// Control the toast notification with a single callable function 'showToast'. This will set the toastVisible property to true for the indicated duration, and provide a custom message. A toast component should then display a toast while toastVisible is true
export const useToast = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastParams, setToastParams] = useState({});

  // Set time that toast is visible
  const durationMilliseconds = 3000;

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

  return { showToast, toastVisible, toastParams };
}





