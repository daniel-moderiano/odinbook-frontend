import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin";
import TextInput from "./TextInput";
import Button from "./Button";

const Login = () => {
  const { login, error, loading } = useLogin();

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
    login(formData);
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl md:text-3xl text-plum-500 pt-4 pb-5">Log in</h2>
      </div>  

      <form className="w-full center px-4 mb-5 md:max-w-md" onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="email" className="flex flex-col text-sm md:text-base">
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

        <div>
          <label htmlFor="password" className="flex flex-col text-sm md:text-base">
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

        <Button type="submit" design="primary" customStyles="font-semibold">Log in</Button>
      </form>
      
        <Link to="/signup" className="w-48 text-center mt-8 px-2 py-2 text-sm font-medium bg-teal-650 shadow-md text-white hover:bg-teal-550 md:text-base md:w-56 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30">Create New Account</Link>
    </div>
  )
}

export default Login;