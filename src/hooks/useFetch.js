// Generalised fetch function for API calls (GET method only)
import { useState, useEffect } from 'react';

export const useFetchGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UseEffect hook set to re-evaluate only if the URL changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Beginning fetch logic here so set loading state
        setLoading(true);
        // Make fetch call using supplied URL
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include'
        })
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
