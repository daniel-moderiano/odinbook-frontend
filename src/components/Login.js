import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Input from "./utils/Input";
import Button from "./utils/Button";
import StyledLink from "./utils/StyledLink";
import { useErrorToast } from '../hooks/useErrorToast';
import { useTestLogin } from '../hooks/useTestLogin';

const Login = () => {
  const { login, error, formError, loading } = useLogin();
  const { testLogin, testError, testLoading } = useTestLogin();

  // All non-401 and non-400 errors
  useErrorToast(error, (error && error.errorMsg));
  useErrorToast(testError, 'An unknown error occurred while logging in')

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
    <div className="flex w-full flex-col h-screen">
      <div className="h-screen m-2 px-4 pt-10 pb-12 flex flex-col items-center lg:justify-center bg-white shadow-sm rounded max-w-md sm:h-auto sm:px-10 sm:mx-auto sm:w-full lg:m-0 lg:flex-row lg:max-w-full lg:bg-transparent lg:h-full lg:shadow-none">

        <div className="container max-w-7xl w-full flex items-center justify-center">
          <div className="items-center justify-center hidden lg:flex w-full -mr-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.22 83.68" className="w-20">
              <title>Odinbook</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <rect fill="#51557d" className="cls-1" width="105.22" height="83.68" />
                  <path fill="#fff" className="cls-2" d="M15.36,48.09c0-11.74,8.07-18.43,17.28-18.43s17.28,6.69,17.28,18.43c0,11.59-8.06,18.29-17.28,18.29S15.36,59.68,15.36,48.09Zm28.44,0c0-8.07-4.46-13.47-11.16-13.47S21.48,40,21.48,48.09,26,61.41,32.64,61.41,43.8,56.08,43.8,48.09Z" />
                  <path fill="#fff" className="cls-2" d="M62.88,61.63h-.22l-.57,3.88H57.34V14.25h6v14L63,35h.22A17.2,17.2,0,0,1,75,29.66c9.43,0,14.54,7,14.54,17.78,0,12-7.49,18.94-15.77,18.94C70.3,66.38,66.12,64.58,62.88,61.63ZM83.4,47.51c0-7.7-2.88-12.81-9.86-12.81-3.1,0-6.7,1.58-10.23,5.18V57.31a14.67,14.67,0,0,0,9.44,4C78.79,61.34,83.4,56.15,83.4,47.51Z" />
                </g>
              </g>
            </svg>
            <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 ml-5">odinbook</h2>
          </div>

          <div className="w-full lg:w-full flex items-center lg:justify-center lg:border-l lg:border-plum-500/20">
            <div className="flex flex-col items-center w-full lg:bg-transparent lg:pt-5 lg:pb-6 lg:max-w-lg">

              <div className="w-full text-center">
                <h2 className="font-semibold text-3xl text-plum-500 pb-6 hidden">Log in</h2>
                <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 pb-6 lg:hidden">odinbook</h2>
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
                      required={true}
                    />
                  </label>
                </div>

                <div className="mb-6">
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

                <Button type="submit" design="primary-lg" customStyles="font-semibold mt-3">
                  {loading ? 'Logging in...' : 'Log in'}
                </Button>

              </form>

              <Button type="button" design="ghost-lg" customStyles="font-semibold mt-3 max-w-sm" onClick={FacebookLogin}>
                <svg className="w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="#50547C" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                </svg>
                <span>Log in with Facebook</span>
              </Button>

              <div>
                <StyledLink to="/signup" design="btn-secondary" customStyles="w-56 mt-12 font-semibold">Create new account</StyledLink>
                <button 
                  onClick={testLogin} 
                  type="button" 
                  className="font-semibold mt-3 flex items-center justify-center w-full px-2 py-1 bg-white text-teal-750 shadow-sm border border-teal-750 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-550/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 mr-2" >
                    <path fill="#218381" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/>
                    </svg>
                  <span>
                    {testLoading ? 'Logging in...': 'Try a test account'}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <footer className="h-16 border-t flex items-center">&copy; odinbook</footer>
    </div>
  )
}

export default Login;