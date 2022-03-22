import { useState } from "react"

// Control the toast notification with a single callable function 'showToast'. This will set the toastVisible property to true for the indicated duration, and provide a custom message. A toast component should then display a toast while toastVisible is true
export const useToast = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastParams, setToastParams] = useState({});

  // Set time that toast is visible
  const durationMilliseconds = 2000;

  const showToast = (type, message) => {
    setToastVisible(true);
    setToastParams({
      type,
      message,
    })

    setTimeout(() => {
      setToastVisible(false);
      // setToastParams({})
    }, durationMilliseconds)
  };

  return { showToast, toastVisible, toastParams };
}






