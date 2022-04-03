import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import CreatePost from "../components/CreatePost";
import userEvent from "@testing-library/user-event";

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

it("Hides modal by default", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CreatePost/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const modal = screen.queryByRole('dialog');
  expect(modal).not.toBeInTheDocument();
});

it("Shows modal when clicking create post button", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CreatePost/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Click the create post button to reveal the add post form
  const btn = screen.getByRole('button', { name: /create a post/i });
  userEvent.click(btn);

  const modal = screen.getByRole('dialog');
  expect(modal).toBeInTheDocument();
});