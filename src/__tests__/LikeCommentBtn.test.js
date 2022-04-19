import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import LikeCommentBtn from "../components/buttons/LikeCommentBtn";

// Matches the exact format received from backend API
const postId = '623e492cd956308f27ea9c40';

const comment = {
  "_id": "623e4924d956308f27ea9c3c",
  "user": {
    "_id": "622ffeb44dc1fd166b08b3ce",
    "firstName": "Chardee",
    "lastName": "McDennis",
    "fullName": "Chardee McDennis",
    "dateJoined": "Invalid DateTime",
    "id": "622ffeb44dc1fd166b08b3ce"
  },
  "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi ut et sed voluptatem! Perferendis autem eius placeat voluptatem? Quam natus doloribus rerum dignissimos ratione incidunt nemo quos quas libero nesciunt! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima sed inventore suscipit quam! Reprehenderit sit repudiandae non mollitia possimus sequi, voluptatem quisquam deleniti qui distinctio accusantium, molestias nulla perspiciatis est.",
  "likes": [
    {
      "_id": "622ffeb44dc1fd166b08b3ce",
      "firstName": "Chardee",
      "lastName": "McDennis",
      "fullName": "Chardee McDennis",
      "dateJoined": "Invalid DateTime",
      "id": "622ffeb44dc1fd166b08b3ce"
    }
  ],
  "createdAt": "2022-03-25T22:58:44.806Z",
  "updatedAt": "2022-03-25T22:58:44.806Z",
  "__v": 0,
  "dateAdded": "March 26, 2022",
  "numLikes": 1,
  "id": "623e4924d956308f27ea9c3c"
}

const commentNoLikes = {
  "_id": "623e492cd956308f27ea9c40",
  "user": {
    "_id": "622ffeb44dc1fd166b08b3ce",
    "firstName": "Chardee",
    "lastName": "McDennis",
    "fullName": "Chardee McDennis",
    "dateJoined": "Invalid DateTime",
    "id": "622ffeb44dc1fd166b08b3ce"
  },
  "text": "Hello!",
  "likes": [],
  "createdAt": "2022-03-25T22:58:52.343Z",
  "updatedAt": "2022-03-25T22:58:52.343Z",
  "__v": 0,
  "dateAdded": "March 26, 2022",
  "numLikes": 0,
  "id": "623e492cd956308f27ea9c40"
}

const currentUser = {
  "_id": "622ffeb44dc1fd166b08b3ce",
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
          <LikeCommentBtn setLocalLike={jest.fn} postId={postId} comment={comment}/>
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
        <LikeCommentBtn setLocalLike={jest.fn} postId={postId} comment={comment}/>
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
        <LikeCommentBtn setLocalLike={jest.fn} postId={postId} comment={commentNoLikes}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const btn = screen.getByRole('button');
  const btnText = screen.getByText('Like');
  expect(btn).not.toHaveAttribute('disabled');
  expect(btnText).toBeInTheDocument();
});