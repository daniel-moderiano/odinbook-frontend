import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import Input from "./Input";
import Button from './Button';
import StyledLink from "./StyledLink";

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
    // For some crazy reason, not destructuring this or explicity setting the value variable here causes all tests to fail! What on Earth?!
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
    <div className="mt-4 flex flex-col items-center justify-center">
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl md:text-3xl text-plum-500 pt-4 pb-5">Sign up</h2>
      </div>  

      <form className="w-full center px-4 mb-5 md:max-w-md" onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="firstName" className="flex flex-col text-sm md:text-base">
            First name
            <Input 
              id="firstName" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="flex flex-col text-sm md:text-base">
            Last name
            <Input 
              id="lastName" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required
            /> 
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="flex flex-col text-sm md:text-base">
            Email address
            <Input 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required={true}
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="flex flex-col text-sm md:text-base">
            Password
            <Input 
              type="password"
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
            <label htmlFor="confirmPassword" className="flex flex-col text-sm md:text-base">
              Confirm password
              <Input 
                type="password"
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>      
          </div>
        )}

        <Button type="submit" customStyles="font-semibold">Create account</Button>
      </form>
      <StyledLink to="/login" design="btn-secondary" customStyles="w-40">Log in</StyledLink>
    </div>
  )
}

export default Signup;