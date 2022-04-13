import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Login from '../components/Login';

// Customise loading/error/data states to properly test UI in different states
let mockLoading;
let mockError;
let mockFormError;

jest.mock("../hooks/useLogin", () => ({
  useLogin: () => ({ 
    login: jest.fn,
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

describe('Button text changes', () => {
  it("Renders 'Log in' text by default", () => {
    mockLoading = false;
    mockError = false;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Login />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const btn = screen.getByRole('button', { name: 'Log in' });
    expect(btn).toBeInTheDocument();
  });
  
  it("Renders loading text appropriately", () => {
    mockLoading = true;
    mockError = false;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Login />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const btn = screen.getByRole('button', { name: /logging in/i });
    expect(btn).toBeInTheDocument();
  });
  
  it("Reverts to default btn text on error", () => {
    mockLoading = false;
    mockError = true;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <Login />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    const btn = screen.getByRole('button', { name: 'Log in' });
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
            <Login />
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
            <Login />
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