import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import CreatePostModal from "../components/modals/CreatePostModal";
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

it("Disables post button by default", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CreatePostModal closeModal={jest.fn} updateFeed={jest.fn}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const postBtn = screen.getByRole('button', { name: /post/i });
  expect(postBtn).toHaveAttribute('disabled');
});

it("Enables post button once user enters post text", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CreatePostModal closeModal={jest.fn} updateFeed={jest.fn}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const postBtn = screen.getByRole('button', { name: /post/i });
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test')

  expect(postBtn).not.toHaveAttribute('disabled');
});