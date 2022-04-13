import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Signup from '../components/Signup';
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from '../context/ToastContext';

// Customise loading/error/data states to properly test UI in different states
let mockLoading;
let mockError;
let mockFormError;

jest.mock("../hooks/useSignup", () => ({
  useSignup: () => ({ 
    signup: jest.fn,
    loading: mockLoading,
    error: mockError,
    formError: mockFormError,
  }),
}));

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

describe("Password confirmation input", () => {
  it("hides confirmPassword input by default", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    )
    const input = screen.queryAllByLabelText('Confirm password');
    expect(input.length).toBe(0);
  });

  it("shows confirmPassword input when user begins typing in password input", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const password = screen.getByLabelText('Password');

    userEvent.type(password, 'test');

    // Now that user has typed in password field, confirmPassword field should appear
    const confirm = screen.getByLabelText('Confirm password');
    expect(confirm).toBeInTheDocument();
  });
});

describe('Button text changes', () => {
  it("Renders 'Create Account' text by default", () => {
    mockLoading = false;
    mockError = false;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const btn = screen.getByRole('button', { name: 'Create Account' });
    expect(btn).toBeInTheDocument();
  });
  
  it("Renders loading text appropriately", () => {
    mockLoading = true;
    mockError = false;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const btn = screen.getByRole('button', { name: /creating/i });
    expect(btn).toBeInTheDocument();
  });
  
  it("Reverts to default btn text on error", () => {
    mockLoading = false;
    mockError = true;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const btn = screen.getByRole('button', { name: 'Create Account' });
    expect(btn).toBeInTheDocument();
  });
});

describe('Form validation', () => {
  it("Shows single form validation error when only on is provided", () => {
    mockLoading = false;
    mockError = true;
    mockFormError = [
      {
        "value": "",
        "msg": "Email is required",
        "param": "email",
        "location": "body"
      },
    ]
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const error = screen.getByText(/email is required/i);
    expect(error).toBeInTheDocument();
  });

  it("Shows multiple form validation errors when multiple are set", () => {
    mockLoading = false;
    mockError = true;
    mockFormError = [
      {
          "value": "",
          "msg": "Email is required",
          "param": "email",
          "location": "body"
      },
      {
          "value": "",
          "msg": "Password is required",
          "param": "password",
          "location": "body"
      }
    ]
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Signup />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const errorOne = screen.getByText(/email is required/i);
    const errorTwo = screen.getByText(/password is required/i);
    expect(errorOne).toBeInTheDocument();
    expect(errorTwo).toBeInTheDocument();
  });
})