import { useState } from "react"

export const useUpdateProfile = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts the comment ID of the comment to be liked
  const updateProfile = async (userId, formData) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),    // Takes in profileData object (essentially an object containing form data)
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

  return { updateProfile, response, loading, error };
}

