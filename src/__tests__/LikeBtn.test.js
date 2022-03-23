import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import LikeBtn from "../components/LikeBtn";

// Matches the exact format received from backend API
const post = {
  "_id": "622ffe9baa78d2996267f835",
  "user": {
      "_id": "622ffe9baa78d2996267f821",
      "firstName": "Kendrick",
      "lastName": "Purdy",
      "fullName": "Kendrick Purdy",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f821"
  },
  "text": "Sequi quibusdam doloribus magnam sint qui qui numquam eveniet cumque. Suscipit aut eos. Delectus officia fugit id recusandae rem explicabo. Ut fugit voluptas officiis error aut adipisci.",
  "likes": [
      "622ffe9baa78d2996267f821",
      "622ffe9baa78d2996267f81f",
      "622ffe9baa78d2996267f821"
  ],
  "comments": [
      "622ffe9caa78d2996267f865"
  ],
  "createdAt": "2022-03-15T02:49:00.055Z",
  "updatedAt": "2022-03-23T10:29:20.881Z",
  "__v": 1,
  "numLikes": 3,
  "numComments": 1,
  "datePosted": "March 15, 2022",
  "id": "622ffe9baa78d2996267f835"
}

const postNoLikes = {
  "_id": "622ffe9baa78d2996267f835",
  "user": {
      "_id": "622ffe9baa78d2996267f821",
      "firstName": "Kendrick",
      "lastName": "Purdy",
      "fullName": "Kendrick Purdy",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f821"
  },
  "text": "Sequi quibusdam doloribus magnam sint qui qui numquam eveniet cumque. Suscipit aut eos. Delectus officia fugit id recusandae rem explicabo. Ut fugit voluptas officiis error aut adipisci.",
  "likes": [],
  "comments": [
      "622ffe9caa78d2996267f865"
  ],
  "createdAt": "2022-03-15T02:49:00.055Z",
  "updatedAt": "2022-03-23T10:29:20.881Z",
  "__v": 1,
  "numLikes": 3,
  "numComments": 1,
  "datePosted": "March 15, 2022",
  "id": "622ffe9baa78d2996267f835"
}

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

jest.mock("../hooks/useLikePost", () => ({
  useLikePost: () => ({ 
    data: {},
    loading: null,
    error: null
  }),
}));

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

it("Disables button immedately when the current user has already liked the post", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikeBtn setLocalLike={jest.fn} post={post}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const btn = screen.getByRole('button');
  expect(btn).toHaveAttribute('disabled');
});

it("Shows btn text as liked when the current user has already liked the post", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikeBtn setLocalLike={jest.fn} post={post}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const btn = screen.getByText('Liked!');
  expect(btn).toBeInTheDocument();
});

it("Renders a normal, non-disabled Like btn when the user has not liked the post previously", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikeBtn setLocalLike={jest.fn} post={postNoLikes}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const btn = screen.getByRole('button');
  const btnText = screen.getByText('Like');
  expect(btn).not.toHaveAttribute('disabled');
  expect(btnText).toBeInTheDocument();
});