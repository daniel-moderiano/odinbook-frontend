import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import Input from "./Input";
import Button from "./Button";
import StyledLink from "./StyledLink";

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

        <Button type="submit" design="primary" customStyles="font-semibold">Log in</Button>
      </form>
      
        <StyledLink to="/signup" design="btn-secondary" customStyles="w-56">Create new account</StyledLink>
    </div>
  )
}

export default Login;