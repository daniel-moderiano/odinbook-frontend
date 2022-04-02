import { useState } from "react";

export const useUpdatePost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts the comment ID of the comment to be liked
  const updatePost = async (postId, postText) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'PUT', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ text: postText }),
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

  return { updatePost, response, loading, error };
}
