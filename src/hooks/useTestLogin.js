import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useTestLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Accepts formData param - an object containing the relevant fields/values for login request
  const testLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        // Pass in login details for Peter Parker test account
        body: JSON.stringify({
          email: 'tobey@gmail.com',
          password: 'peterparker',
        }),
      });

      const responseJSON = await response.json();

      if (!responseJSON.user) {   // error with login request
        setError(responseJSON);
        setLoading(false);
        return;
      } else {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state 
        setLoading(false);
        setError(null);
        dispatch({ type: 'LOGIN', payload: responseJSON.user })
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { testLogin, loading, error };
}

