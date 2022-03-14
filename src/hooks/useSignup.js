import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (formData) => {
    const { email, password, confirmPassword, firstName, lastName } = formData;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: new URLSearchParams([
          ['email', email], 
          ['password', password],
          ['confirmPassword', confirmPassword],
          ['firstName', firstName],
          ['lastName', lastName],
        ]).toString()
      });

      const responseJSON = await response.json();

      if (!responseJSON.user) {   // error with signup request, JSON error object returned
        setError(responseJSON);
      } else {
         // No errors occured. Dispatch LOGIN action after adjusting state, since the user should be logged in once registered
        setLoading(false);
        setError(null);
        dispatch({ type: 'LOGIN', payload: responseJSON.user })
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
