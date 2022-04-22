// Generalised fetch function for API calls (GET method only)
import { useState, useEffect } from 'react';

// This is intended for once-per-mount fetch calls in components. If your component will need to re-fetch data multiple times in its lifetime, or fetch on comman (e.g. button click), this is not appropriate.
export const useFetchGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UseEffect hook will re-evaluate only if the fetch URL changes
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
