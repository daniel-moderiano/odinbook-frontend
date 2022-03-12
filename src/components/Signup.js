import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';

const Signup = () => {
  const { user } =  useAuthContext();
  // This destructuring syntax with key:value pairing allows 'custom' naming of the generic loading and error properties provided by the fetch hook
  // const { data: user, loading: userLoading, error: userError } = useFetch('http://localhost:3000/api/users/current');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Use the name attributes to set the state (ensure names correspond to keys in state object)
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Capture all form data using the current value of the formData state object
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <div className="Signup">
      <div className="Signup-header">
        <h2 className="Signup-title">Sign up</h2>
      </div>  

      <form className="Signup-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="form-label">
          First name
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="lastName" className="form-label">
          Last name
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            required
          />  
        </label>

        <label htmlFor="email" className="form-label">
          Email address
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="password" className="form-label">
          Password
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {/* Conditionally render the confirm password field once user enters a value in the password field */}
        {formData.password.length !== 0 && (
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <button type="submit">Create account</button>
      </form>
      <Link to="/login">Log in</Link>
    </div>
  )
}

export default Signup;