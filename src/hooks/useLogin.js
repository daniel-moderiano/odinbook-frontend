import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams([['email', email], ['password', password]]).toString()
      });

      const responseJSON = await response.json();

      if (!responseJSON.errorMsg) {   // no error on backend, credentials valid
        const user = await response.json();
        dispatch({ type: 'LOGIN', payload: user })
        console.log(user);
      } else {    // error with request
        setError(responseJSON);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

