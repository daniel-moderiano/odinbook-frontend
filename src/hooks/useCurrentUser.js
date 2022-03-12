import { useCallback, useState } from "react"

export const useCurrentUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/users/current', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      const responseJSON = await response.json();

      if (!responseJSON.user) {   // error on backend, current user does not exist. Return null for user.
        setError(responseJSON);
        return null;
      } 
      // No error occurred. Return response containing user object
      setLoading(false);
      setError(null);
      return responseJSON.user;
      
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { getCurrentUser, loading, error };
}

