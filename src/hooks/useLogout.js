import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST', 
        mode: 'cors',
        credentials: 'include',
      });
      const responseJSON = await response.json();

      if (!response.status === 200) {   // error with logout request
        setError(responseJSON);
      }

      // No error, logout successful. Payload not required, it will be set to null within the reducer function for this action type
      setLoading(false);
      setError(null);
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      setError(err);
      setLoading(false);
    } 
  };

  return { logout, loading, error };
}

