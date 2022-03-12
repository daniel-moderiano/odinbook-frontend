import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin";

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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl text-yellow-700 py-4">Log in</h2>
      </div>  

      <form className="w-full center px-4 mb-5 md:max-w-md" onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="email" className="flex flex-col">
            Email address
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 border rounded-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 ring-transparent ring-offset-4 ring-offset-yellow-500/40 focus:border-yellow-500/80"
            />
          </label>
        </div>

        <div className="">
          <label htmlFor="password" className="flex flex-col">
            Password
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 border rounded-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 ring-transparent ring-offset-4 ring-offset-yellow-500/40 focus:border-yellow-500/80 "
            />
          </label>
        </div>

        <button type="submit" className="w-full mt-5 px-4 py-2 font-bold rounded bg-yellow-700 text-white hover:bg-yellow-600">Log in</button>
      </form>
      <Link to="/signup" className="w-48 text-center mt-5 px-4 py-2 text-sm font-bold rounded bg-yellow-700 text-white hover:bg-yellow-600">Create New Account</Link>
    </div>
  )
}

export default Login;