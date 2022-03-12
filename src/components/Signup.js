import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import TextInput from "./TextInput";

const Signup = () => {
  const { signup, error, loading } = useSignup();

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
    signup(formData)
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center">
    <div className="w-full text-center">
      <h2 className="font-bold text-2xl text-yellow-700 py-4">Sign up</h2>
    </div>  

      <form className="w-full center px-4 mb-5 md:max-w-md" onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="firstName" className="flex flex-col">
            First name
            <TextInput 
              id="firstName" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="flex flex-col">
            Last name
            <TextInput 
              id="lastName" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required
            /> 
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="flex flex-col">
            Email address
            <TextInput 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required={true}
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="flex flex-col">
            Password
            <TextInput 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Conditionally render the confirm password field once user enters a value in the password field */}
        {formData.password.length !== 0 && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="flex flex-col">
              Confirm password
              <TextInput 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            </label>      
          </div>
        )}

        <button type="submit" className="w-full mt-5 px-4 py-2 font-bold rounded bg-yellow-700 text-white hover:bg-yellow-600">Create account</button>
      </form>
      <Link to="/login" className="w-36 text-center mt-5 px-4 py-2 text-sm font-bold rounded bg-yellow-700 text-white hover:bg-yellow-600">Log in</Link>
    </div>
  )
}

export default Signup;