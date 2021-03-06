import { useEffect } from "react";
import { useToastContext } from "../context/ToastContext";

// Show an error toast with a fixed, non-specific message whenever a designated error property is set to true (e.g. on data fetch or post)
export const useErrorToast = (error, errorMsg) => {
  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', errorMsg);
    }
  }, [error, errorMsg, showToast]);
}

