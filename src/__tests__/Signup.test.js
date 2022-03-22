import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Signup from '../components/Signup';
import { AuthContextProvider } from "../context/AuthContext";

describe("Password confirmation input", () => {
  it("hides confirmPassword input by default", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Signup />
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
          <Signup />
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