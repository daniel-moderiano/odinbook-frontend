import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Input from "./utils/Input";
import Button from './utils/Button';
import StyledLink from "./utils/StyledLink";
import { useErrorToast } from "../hooks/useErrorToast";
import FormErrorIcon from './icons/FormErrorIcon';
import PasswordContainer from "./utils/PasswordContainer";
import AuthPage from './AuthPage';

const Signup = () => {
  const { signup, error, formError, loading } = useSignup();

  // All non-form validation errors
  useErrorToast(error, (error && error.errorMsg));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <AuthPage title="Sign up">
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
            <PasswordContainer showPassword={showPassword} handleClick={() => setShowPassword((prevState) => (!prevState))}>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autocomplete="new-password"
              />
            </PasswordContainer>
          </label>
        </div>

        {/* Conditionally render the confirm password field once user enters a value in the password field */}
        {formData.password.length !== 0 && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="flex flex-col text-sm md:text-base">
              Confirm password
              <PasswordContainer showPassword={showConfirmPassword} handleClick={() => setShowConfirmPassword((prevState) => (!prevState))}>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autocomplete="new-password"
                />
              </PasswordContainer>
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

      <StyledLink to="/login" design="btn-teal" customStyles="w-60 mt-12 font-semibold">Already have an account?</StyledLink>

    </AuthPage>
  )
}

export default Signup;