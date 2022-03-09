import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Signup from "./Signup";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  return (
    <div className="Login">
      <div className="Login-header">
        <h2 className="Login-title">Log in</h2>
      </div>  

      <form className="Login-form" onSubmit={handleSubmit}>

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

        <button type="submit">Log in</button>
      </form>
      <Link to="/signup">Create New Account</Link>
    </div>
  )
}

export default Login;