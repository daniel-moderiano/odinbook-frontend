import { useCallback, useState } from "react"

// Custom hook that provides functionality to check for a current user. This is used to not only fetch currently logged in user's details, but as a means of checking if there is a currently logged in user (to protect routes in React)
export const useCurrentUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Call this function to get the current user's info. Throws error if no user is currently logged in
  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/users/current`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      const responseJSON = await response.json();   // includes either user details or error message

      if (!responseJSON.user) {   // typically means no session/cookie exists and this is a new/logged out user
        setError(responseJSON);
        setLoading(false);
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

