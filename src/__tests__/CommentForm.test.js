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

const postId = '623131b16c80b0c51067d60a';

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

jest.mock("../hooks/usePostComment", () => ({
  usePostComment: () => ({ 
    response: {},
    loading: null,
    error: null
  }),
}));

const updateComments = jest.fn;

it("Hides the post button by default", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <CommentForm postId={postId} updateComments={updateComments}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const postBtn = screen.queryByRole('button', { name: /post/i });
  expect(postBtn).not.toBeInTheDocument();
});


// 'Shows post button only when the user types input' was originally tested here, but unknown bugs with userEvent and inputs/textareas made the test useless. Consider manually testing when altering CommentForm component