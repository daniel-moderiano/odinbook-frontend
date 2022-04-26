import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Call this function with the object created using relevant user sign up data
  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/users/register`, {
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
        setFormError(null)
        dispatch({ type: 'LOGIN', payload: responseJSON.user });
        return;
      } else {    // error with login request
        if (responseJSON.errorMsg === 'Email already in use') {   // user must select a different email. Set to formError
          setFormError([{ "msg": "This email is taken. Choose another." }]);
          setLoading(false);
        } else if (responseJSON.length) {    // length indicates form validation errors (i.e. JSON response is array)
          setFormError(responseJSON)
          setLoading(false);
        } else {    // unspecified error, return generic error msg
          setError({ errorMsg: 'An unknown error occurred while signing up.' })
          setLoading(false);
        }
      }
    } catch (err) {   // internal React hook error
      setError({ errorMsg: 'An unknown error occurred while signing up.' });
      setLoading(false);
    }
  };

  return { signup, loading, error, formError };
}

