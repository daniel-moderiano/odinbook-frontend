import { useState } from "react"

export const useCreatePost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/posts`, {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'include',
        body: formData,
      });
      const responseJSON = await response.json();

      if (response.status !== 200) {   // error with creating post
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

  return { createPost, response, loading, error };
}

