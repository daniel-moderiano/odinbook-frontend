import { useState } from "react";

export const useDeleteComment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Requires both post and comment ID to ensure the API route is satisfied adn that the comment is removed from the post's comments array.
  const deleteComment = async (postId, commentId) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/posts/${postId}/comments/${commentId}`, {
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

      // No error, operation successful
      setLoading(false);
      setError(null);
      setResponse(responseJSON);
    } catch (err) {   // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setResponse(null)
    } 
  };

  return { deleteComment, response, loading, error };
}

