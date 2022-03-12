import { useCallback, useState } from "react"

export const useCurrentUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/current', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      const responseJSON = await response.json();

      if (!responseJSON.errorMsg) {   // no error on backend, current user exists
        return responseJSON;
      } else {    // error with request, no current user. Return null rather than setting error object
        setError(responseJSON)
        return null;
      }

    } catch (err) {
      setError(err);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  }, []);

  return { getCurrentUser, loading, error };
}

