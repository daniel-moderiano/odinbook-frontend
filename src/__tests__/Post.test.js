import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Post from '../components/Post';
import userEvent from "@testing-library/user-event";

const testPostWithPics = {
  "image": {
      "imageUrl": "http://placeimg.com/640/480"
  },
  "_id": "622f19ab4212d0e69e8eb0d4",
  "user": {
      "_id": "622f19ab4212d0e69e8eb0b9",
      "firstName": "John",
      "lastName": "Doe",
      "fullName": "John Doe",
      "profilePic": {
        "imageUrl": "http://placeimg.com/640/480"
      },
      "id": "622f19ab4212d0e69e8eb0b9"
  },
  "text": "Test post",
  "likes": [
    {
      "_id": "622f19ac4212d0e69e8eb0ef",
    },
  ],
  "comments": [
  ],
  "numComments": 0,
  "numLikes": 1,
  "createdAt": "2022-03-14T10:32:12.064Z",
  "updatedAt": "2022-03-14T10:32:12.064Z",
  "__v": 0,
  "id": "622f19ab4212d0e69e8eb0d4"
};

const testPostNoPics = {
  "_id": "622f19ab4212d0e69e8eb0d4",
  "user": {
      "_id": "622f19ab4212d0e69e8eb0b9",
      "firstName": "John",
      "lastName": "Doe",
      "fullName": "John Doe",
      "id": "622f19ab4212d0e69e8eb0b9"
  },
  "text": "Test post",
  "likes": [
    {
      "_id": "622f19ac4212d0e69e8eb0ef",
    },
    {
      "_id": "622f19ac4212d0e69e8eb0ef",
    },
  ],
  "comments": [
      {
          "_id": "622f19ac4212d0e69e8eb0ef",
          "user": "622f19ab4212d0e69e8eb0bf",
          "text": "Et distinctio autem voluptatem voluptatem maiores reiciendis laborum voluptas et.",
          "likes": [],
          "createdAt": "2022-03-14T10:32:12.061Z",
          "updatedAt": "2022-03-14T10:32:12.061Z",
          "__v": 0,
          "id": "622f19ac4212d0e69e8eb0ef"
      }
  ],
  "numComments": 1,
  "numLikes": 2,
  "createdAt": "2022-03-14T10:32:12.064Z",
  "updatedAt": "2022-03-14T10:32:12.064Z",
  "__v": 0,
  "id": "622f19ab4212d0e69e8eb0d4"
};

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


describe("Text-only posts", () => {
  const setup = () => render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Post post={testPostNoPics} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  it("Displays blank profile pic when none are available for the author of the post", () => {
    setup();
    const pic = screen.getByAltText(/blank profile picture/i) 
    expect(pic).toBeInTheDocument();
  });

  it("Does not attempt to display image when no image url exists for the post", () => {
    setup();
    // Image posts will have blank alt text
    const pic = screen.queryByAltText('');
    expect(pic).not.toBeInTheDocument();
  });

  it("Displays correct comment count for single comment", () => {
    setup();
    const comments = screen.getByText(/1 comment/i) 
    expect(comments).toBeInTheDocument();
  });

  it("Displays correct like count for >1 like", () => {
    setup();
    const likes = screen.getByText(/2/i) 
    expect(likes).toBeInTheDocument();
  });
});

describe("Image-containing posts", () => {
  const setup = () => render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Post post={testPostWithPics} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  it("Displays profile pic when one is available for the author of the post", () => {
    setup();
    const pic = screen.getByAltText(/profile picture/i) 
    expect(pic).toBeInTheDocument();
  });

  it("Displays post image when image url exists for the post", () => {
    setup();
    // Image posts will have blank alt text
    const pic = screen.queryByAltText('');
    expect(pic).toBeInTheDocument();
  });

  it("Displays correct comment count for no comments", () => {
    setup();
    const comments = screen.getByText(/No comments/i) 
    expect(comments).toBeInTheDocument();
  });

  it("Displays correct like count for single like", () => {
    setup();
    const likes = screen.getByText(/1/i) 
    expect(likes).toBeInTheDocument();
  });

  it('Increases local like count when clicking like button', () => {
    setup();
    const likeBtn = screen.getByRole('button', { name: /like/i });
    userEvent.click(likeBtn);

    const likes = screen.getByText(/2/i) 
    expect(likes).toBeInTheDocument();
  })
});