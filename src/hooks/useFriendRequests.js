import { useState } from "react"

export const useFriendRequests = (userId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts the user ID of the request target (i.e. user you are sending request to)
  const request = async (requestType) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`http://localhost:3000/api/friends/${userId}`, {
        method: 'PUT', 
        headers: {"Content-type": "application/json; charset=UTF-8"},
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ requestType })
      });
      const responseJSON = await response.json();

      console.log(response.status);

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

  return { request, response, loading, error };
}

