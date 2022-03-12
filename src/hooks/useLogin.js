import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: new URLSearchParams([['email', email], ['password', password]]).toString()
      });

      const responseJSON = await response.json();

      if (responseJSON.errorMsg) {   // error with login request
        setError(responseJSON);
      }
      // No errors occured. Dispatch appropriate LOGIN action after adjusting state 
      setLoading(false);
      setError(null);
      dispatch({ type: 'LOGIN', payload: responseJSON })
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { login, loading, error };
}

