import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useTestLogin = () => {
  const [testError, setTestError] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Submits request to test-specific login route. All login details are kept securely on backend
  const testLogin = async (formData) => {
    setTestLoading(true);
    setTestError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/users/login/test`, {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      const responseJSON = await response.json();

      if (responseJSON.user) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state 
        setTestLoading(false);
        setTestError(null);
        dispatch({ type: 'LOGIN', payload: responseJSON.user });
        return;
      } else {    // error with login request. Can only be server error
        setTestError({ errorMsg: 'An unknown error occurred while logging in.' })
        setTestLoading(false);
      }
    } catch (err) {   // internal React hook error
      setTestError({ errorMsg: 'An unknown error occurred while logging in.' });
      setTestLoading(false);
    }
  };

  return { testLogin, testError, testLoading };
}

