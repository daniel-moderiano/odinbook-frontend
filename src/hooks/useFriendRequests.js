import { useState } from "react"

export const useFriendRequests = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Accepts the user ID of the request target (i.e. user you are sending request to)
  const sendRequest = async (userId) => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch(`http://localhost:3000/api/friends/${userId}`, {
        method: 'PUT', 
        headers: {"Content-type": "application/json; charset=UTF-8"},
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ requestType: 'sendRequest' })
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
    } catch (err) {
      setError(err);
      setLoading(false);
      setResponse(null)
    } 
  };

  return { sendRequest, response, loading, error };
}

