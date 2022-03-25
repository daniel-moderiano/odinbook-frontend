import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import userEvent from "@testing-library/user-event";
import CommentForm from "../components/CommentForm";

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


it("Hides the post button by default", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CommentForm />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const postBtn = screen.queryByRole('button', { name: /post/i });
  expect(postBtn).not.toBeInTheDocument();
});


it('Shows post button only when the user types input', () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CommentForm />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // User type in input, which should cause the post btn to render
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test');

  const postBtn = screen.getByRole('button', { name: /post/i });
  expect(postBtn).toBeInTheDocument();
})
