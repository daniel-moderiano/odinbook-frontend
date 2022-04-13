import { useEffect } from "react";
import { useToastContext } from "../context/ToastContext";

// Show an success toast with a fixed, non-specific message whenever a designated response/success property is set to true (e.g. on successful data fetch or post)
export const useSuccessToast = (response, successMsg) => {
  const { showToast } = useToastContext();

  useEffect(() => {
    if (response) {
      showToast('success', successMsg);
    }
  }, [response, successMsg, showToast]);
}

