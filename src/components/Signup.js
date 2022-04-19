import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Input from "./utils/Input";
import Button from './utils/Button';
import StyledLink from "./utils/StyledLink";
import { useErrorToast } from "../hooks/useErrorToast";
import OdinbookIcon from "./icons/OdinbookIcon";
import FormErrorIcon from './icons/FormErrorIcon';
import Footer from "./Footer";

const Signup = () => {
  const { signup, error, formError, loading } = useSignup();

  // All non-form validation errors
  useErrorToast(error, (error && error.errorMsg));

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

  return (
    <div className="flex w-full flex-col h-screen sm:mt-6 md:mt-12">
      <div className="h-screen m-2 px-4 pt-10 pb-12 flex flex-col items-center lg:justify-center bg-white shadow-sm rounded max-w-md sm:h-auto sm:px-10 sm:mx-auto sm:w-full lg:m-0 lg:flex-row lg:max-w-full lg:bg-transparent lg:h-full lg:shadow-none md:mb-6">
        <div className="container max-w-7xl w-full flex items-center justify-center">
          <div className="items-center justify-center hidden lg:flex w-full -mr-16">
            <OdinbookIcon iconStyles="w-20" />
            <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 ml-5">odinbook</h2>
          </div>

          <div className="w-full lg:w-full flex items-center lg:justify-center lg:border-l lg:border-plum-500/20">
            <div className="flex flex-col items-center w-full lg:bg-transparent lg:pt-5 lg:pb-6 lg:max-w-lg">
              <div className="w-full text-center lg:max-w-sm lg:text-left">
                <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 pb-7 lg:hidden">Sign up</h2>
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
                      autocomplete="given-name"
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
                      autocomplete="family-name"
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
                      autocomplete="email"
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
                      autocomplete="new-password"
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
                        autocomplete="new-password"
                      />
                    </label>
                  </div>
                )}

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
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
              </form>

              <StyledLink to="/login" design="btn-secondary" customStyles="w-60 mt-12 font-semibold">Already have an account?</StyledLink>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signup;