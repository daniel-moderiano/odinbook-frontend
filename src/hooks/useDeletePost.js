import { useState } from "react";

// Export easily callable function that can delete posts by ID
export const useDeletePost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts the post ID of the post to be deleted
  const deletePost = async (postId) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/posts/${postId}`, {
        method: 'DELETE', 
        mode: 'cors',
        credentials: 'include',
      });
      const responseJSON = await response.json();

      if (response.status !== 200) {   // error with delete operation
        setError(responseJSON);
        setLoading(false);
        // Return out of the function here to avoid setting the response below with error JSON
        return;
      }

      // No error, request successful
      setLoading(false);
      setError(null);
      setResponse(responseJSON);
    } catch (err) {   // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setResponse(null);
    } 
  };

  return { deletePost, response, loading, error };
}

