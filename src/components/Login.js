import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Input from "./utils/Input";
import Button from "./utils/Button";
import { useErrorToast } from '../hooks/useErrorToast';
import StyledLink from "./utils/StyledLink";
import FormErrorIcon from './icons/FormErrorIcon';
import FacebookIcon from './icons/FacebookIcon';
import TestLoginBtn from "./buttons/TestLoginBtn";
import PasswordContainer from './utils/PasswordContainer';
import AuthPage from './AuthPage';

const Login = () => {
  const { login, error, formError, loading } = useLogin();

  // All non-form validation errors
  useErrorToast(error, (error && error.errorMsg));

  const [showPassword, setShowPassword] = useState(false);

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
  };

  // Open the facebook auth page by a direct URL request to the backend API url
  const FacebookLogin = () => {
    window.open(process.env.REACT_APP_FB_AUTH_ROUTE, "_self");
  };

  return (
    <AuthPage title="Log in">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="flex flex-col text-sm md:text-base">
            Email address
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autocomplete="email"
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="flex flex-col text-sm md:text-base">
            Password
            <PasswordContainer showPassword={showPassword} handleClick={() => setShowPassword((prevState) => (!prevState))}>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autocomplete="current-password"
              />
            </PasswordContainer>
          </label>
        </div>

        {/* Display form validation errors in single location here */}
        {formError && (
          <div className="-mb-2">
            {formError.map((error, index) => (
              <div key={index} className="text-sm text-red-700 flex items-center justify-start my-1">
                <FormErrorIcon iconStyles="w-4 mr-2" />
                <span>{error.msg}</span>
              </div>
            ))}
          </div>
        )}

        <Button type="submit" design="primary-lg" customStyles="font-semibold mt-6">
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>

      <Button type="button" design="ghost-lg" customStyles="font-semibold mt-3 max-w-sm" onClick={FacebookLogin}>
        <FacebookIcon iconStyles="w-5 mr-3" iconFill="#50547C" />
        <span>Log in with Facebook</span>
      </Button>
      <div>
        <StyledLink to="/signup" design="btn-teal" customStyles="w-56 mt-12 font-semibold">Create new account</StyledLink>
        <TestLoginBtn />
      </div>
      
    </AuthPage>
  )
}

export default Login;