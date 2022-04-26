import { useState } from "react"

// Used to update textual profile information only; no image updates. 
export const useUpdateProfile = () => {
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Pass in a basic object constructed using any relevant profile information to be updated
  const updateProfile = async (userId, formData) => {
    setError(null);
    setLoading(true);
    setResponse(null);
    setFormError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}/users/${userId}`, {
        method: 'PUT', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const responseJSON = await response.json();

      console.log(responseJSON);

      if (response.status !== 200) {   // error with posting comment
        if (responseJSON.length) {    // form validation error
          setFormError(responseJSON)
          setLoading(false);
        } else if (responseJSON.errorMsg === 'This email is already in use') {
          // Create a custom form validation error for this specfic case
          setFormError([{
            msg: 'This email is already in use. Choose another.'
          }])
          setLoading(false);
        }
        setError(responseJSON);
        setLoading(false);
        // Return out of the function here to avoid setting the 'completed' response below with error JSON data
        return;
      }

      // No error, request successful
      setLoading(false);
      setError(null);
      setFormError(null)
      setResponse(responseJSON);
    } catch (err) {   // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setResponse(null)
    } 
  };

  return { updateProfile, response, loading, error, formError };
}

