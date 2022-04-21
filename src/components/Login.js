import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Input from "./utils/Input";
import Button from "./utils/Button";
import { useErrorToast } from '../hooks/useErrorToast';
import StyledLink from "./utils/StyledLink";
import FormErrorIcon from './icons/FormErrorIcon';
import OdinbookIcon from './icons/OdinbookIcon';
import FacebookIcon from './icons/FacebookIcon';
import Footer from "./Footer";
import TestLoginBtn from "./buttons/TestLoginBtn";
import PasswordContainer from './utils/PasswordContainer';

const Login = ({ setInitialLogin }) => {
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
    window.open('http://localhost:3000/auth/facebook', "_self");
  };

  return (
    <div className="flex w-full flex-col h-screen sm:mt-6 md:mt-12">
      <div className="h-screen m-2 px-4 pt-10 pb-12 flex flex-col items-center lg:justify-center bg-white shadow-sm rounded max-w-md sm:h-auto sm:px-10 sm:mx-auto sm:w-full lg:m-0 lg:flex-row lg:max-w-full lg:bg-transparent lg:h-full lg:shadow-none md:mb-6">

        <div className="container max-w-7xl w-full flex items-center justify-center">
          <div className="items-center justify-center hidden lg:flex w-full -mr-16">
            <OdinbookIcon iconStyles="w-20"/>
            <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 ml-5">odinbook</h2>
          </div>

          <div className="w-full lg:w-full flex items-center lg:justify-center lg:border-l lg:border-plum-500/20">
            <div className="flex flex-col items-center w-full lg:bg-transparent lg:pt-5 lg:pb-6 lg:max-w-lg">

              <div className="w-full text-center">
                <h2 className="font-semibold text-3xl text-plum-500 pb-6 hidden">Log in</h2>
                <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 pb-7 lg:hidden">Log in</h2>
              </div>

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
                <StyledLink to="/signup" design="btn-secondary" customStyles="w-56 mt-12 font-semibold">Create new account</StyledLink>
                <TestLoginBtn />
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login;