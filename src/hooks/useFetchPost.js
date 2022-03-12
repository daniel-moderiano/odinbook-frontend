// Generalised fetch function for API calls (GET method only)
import { useState, useEffect } from 'react';

export const useFetchPost = (url, data) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // UseEffect hook set to re-evaluate only if the URL changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Beginning fetch logic here so set loading state
        setLoading(true);
        setError(null);
        // Make fetch call using supplied URL
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(Object.entries(data)).toString()
        });
        // Data should always be in JSON format. Note that the error message 'Unexpted token < in JSON' means we are getting HTML. Use response.text() to see this
        const responseJSON = await response.json();
        setData(responseJSON);
      } catch (err) {
        setError(err);
      } finally {
        // Regardless of success or error, the loading state is complete
        setLoading(false);
      }
    };
    // Must call the fetch function to complete the hook
    fetchData();
  }, [url])

  return { data, loading, error };
}
