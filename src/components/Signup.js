import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import Input from "./utils/Input";
import Button from './utils/Button';
import StyledLink from "./utils/StyledLink";

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
              <div className="w-full text-center lg:max-w-sm lg:text-left">
                <h2 className="font-semibold text-3xl text-plum-500 pb-6">Sign up</h2>
                {/* <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 pb-6">odinbook</h2> */}
              </div>

              <form className="w-full max-w-sm" onSubmit={handleSubmit}>

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

                <Button type="submit" design="primary-lg" customStyles="font-semibold mt-6">Create account</Button>
              </form>

              <StyledLink to="/login" design="btn-secondary" customStyles="w-60 mt-12 font-semibold">Already have an account?</StyledLink>

            </div>
          </div>
        </div>
      </div>
      <footer className="h-16 border-t flex items-center">&copy; odinbook</footer>
    </div>
  )
}

export default Signup;