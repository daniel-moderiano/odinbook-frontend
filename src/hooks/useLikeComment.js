import { useState } from "react"

export const useLikeComment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Requires both the post and comment IDs simply due to the REST API arrangement
  const likeComment = async (postId, commentId) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/posts/${postId}/comments/${commentId}/likes`, {
        method: 'PUT', 
        mode: 'cors',
        credentials: 'include',
      });
      const responseJSON = await response.json();

      if (response.status !== 200) {   // error with friend request
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
      setResponse(null)
    } 
  };

  return { likeComment, response, loading, error };
}

