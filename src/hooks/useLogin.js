import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Call this function with the FormData object created using relevant user login data
  const login = async (formData) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/users/login`, {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const responseJSON = await response.json();

      if (responseJSON.user) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state 
        setLoading(false);
        setError(null);
        setFormError(null);
        dispatch({ type: 'LOGIN', payload: responseJSON.user });
        return;
      } else {    // error with login request
        if (responseJSON.errorMsg === 'Unauthorized') {   // invalid credentials
          setError({ errorMsg: 'Invalid credentials. Try again.' });
          setLoading(false);
        } else if (responseJSON.length) {    // length indicates form validation errors (i.e. JSON response is array)
          setFormError(responseJSON)
          setLoading(false);
        } else {    // unspecified error, return generic error msg
          setError({ errorMsg: 'An unknown error occurred while logging in.' })
          setLoading(false);
        }
      }
    } catch (err) {   // internal React hook error
      setError({ errorMsg: 'An unknown error occurred while logging in.' });
      setLoading(false);
    }
  };

  return { login, loading, error, formError };
}

