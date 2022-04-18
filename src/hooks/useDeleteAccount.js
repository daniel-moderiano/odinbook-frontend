import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleteAccount = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { dispatch } = useAuthContext();

  // Accepts the comment ID of the comment to be liked
  const deleteAccount = async (userId) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/account`, {
        method: 'DELETE', 
        mode: 'cors',
        credentials: 'include',
      });
      const responseJSON = await response.json();

      if (response.status !== 200) {   // error with deletion
        setError(responseJSON);
        setLoading(false);
        // Return out of the function here to avoid setting the response below with error JSON
        return;
      }

      // No error, request successful
      setLoading(false);
      setError(null);
      setResponse(responseJSON);
      // User will be logged out on backend as part of the deletion. Perform frontend log out action
      dispatch({ type: 'LOGOUT' });
    } catch (err) {   // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setResponse(null)
    } 
  };

  return { deleteAccount, response, loading, error };
}

