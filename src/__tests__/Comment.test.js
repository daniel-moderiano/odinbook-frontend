import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import userEvent from "@testing-library/user-event";
import Comment from '../components/Comment';

// Matches the exact format of data received from backend 
const comment = {
    "_id": "622ffe9caa78d2996267f85d",
    "user": {
        "_id": "622ffe9baa78d2996267f82f",
        "firstName": "Chesley",
        "lastName": "Rowe",
        "fullName": "Chesley Rowe",
        "dateJoined": "Invalid DateTime",
        "id": "622ffe9baa78d2996267f82f"
    },
    "text": "Nulla omnis aliquam autem est aut officia placeat sunt iste.",
    "likes": [
      "622ffe9baa78d2996267f82f",
      "622ffe9baa78d2996267f82g"
    ],
    "createdAt": "2022-03-15T02:49:00.053Z",
    "updatedAt": "2022-03-15T02:49:00.053Z",
    "__v": 0,
    "dateAdded": "March 15, 2022",
    "numLikes": 2,
    "id": "622ffe9caa78d2996267f85d"
}

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


it("Renders the correct number of likes", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Comment postId="622ffe9baa78d2996267f835" commentData={comment}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const likeCount = screen.getByRole('button', { name: /2/i });
  expect(likeCount).toBeInTheDocument();
});


it('Increases local like count when clicking like button', () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Comment postId="622ffe9baa78d2996267f835" commentData={comment}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const likeBtn = screen.getByRole('button', { name: /like/i });
  userEvent.click(likeBtn);

  const likes = screen.getByText(/3/i) 
  expect(likes).toBeInTheDocument();
})
