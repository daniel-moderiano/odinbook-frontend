import { useState, useCallback } from "react"

export const useFetchProfile = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileUser, setProfileUser] = useState(null);

  // Accepts the comment ID of the comment to be liked
  const fetchProfile = useCallback(async (userId) => {
    setError(null);
    setLoading(true);
    setProfileUser(null);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'GET', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const responseJSON = await response.json();

      if (response.status !== 200) {   // error with posting comment
        setError(responseJSON);
        setLoading(false);
        // Return out of the function here to avoid setting the 'completed' response below with error JSON data
        return;
      }

      // No error, request successful
      setLoading(false);
      setError(null);
      setProfileUser(responseJSON);
    } catch (err) {   // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setProfileUser(null)
    } 
  }, []);

  return { fetchProfile, profileUser, loading, error };
}

