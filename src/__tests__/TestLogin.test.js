import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import TestLogin from '../components/TestLogin';

// Customise loading/error/data states to properly test UI in different states
let mockLoading;
let mockError;

jest.mock("../hooks/useTestLogin", () => ({
  useTestLogin: () => ({ 
    testLogin: jest.fn,
    testLoading: mockLoading,
    testError: mockError
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

it("Renders 'try a test account' text by default", () => {
  mockLoading = false;
  mockError = false;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <TestLogin />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const btn = screen.getByRole('button', { name: /try a test account/i });
  expect(btn).toBeInTheDocument();
});

it("Renders loading text appropriately", () => {
  mockLoading = true;
  mockError = false;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <TestLogin />
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
          <TestLogin />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const btn = screen.getByRole('button', { name: /try a test account/i });
  expect(btn).toBeInTheDocument();
});