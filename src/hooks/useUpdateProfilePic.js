import { useState } from "react"

// Specific profile update route for handling profile picture updates
export const useUpdateProfilePic = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Requires FormData object as API route parses multipart/form data.
  const updateProfilePic = async (userId, formData) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/users/${userId}/profile-pic`, {
        method: 'PUT', 
        mode: 'cors', 
        credentials: 'include',
        body: formData,
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
      setResponse(responseJSON);
    } catch (err) {   // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setResponse(null)
    } 
  };

  return { updateProfilePic, response, loading, error };
}

