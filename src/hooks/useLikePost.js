import { useState } from "react"

export const useLikePost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts the post ID of the post to be liked
  const likePost = async (postId) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
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

  return { likePost, response, loading, error };
}

