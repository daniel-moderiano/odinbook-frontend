import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Comments from '../components/Comments';

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

// Initialise the variable here so the mock doesn't spit an undefined error
let mockComments;
let mockLoading;
let mockError;

// Mock useFetchGet to return a pre-defined friends object that can be customised for different tests
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockComments,
    loading: mockLoading,
    error: mockError,
  }),
}));

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));


it("Renders the correct number of comments once data is fetched", () => {
  mockLoading = false;
  mockError = null;
  mockComments = [
    {
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
        "likes": [],
        "createdAt": "2022-03-15T02:49:00.053Z",
        "updatedAt": "2022-03-15T02:49:00.053Z",
        "__v": 0,
        "dateAdded": "March 15, 2022",
        "numLikes": 0,
        "id": "622ffe9caa78d2996267f85d"
    },
    {
        "_id": "622ffe9caa78d2996267f869",
        "user": {
            "_id": "622ffe9baa78d2996267f82e",
            "firstName": "Gillian",
            "lastName": "Schuster",
            "fullName": "Gillian Schuster",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f82e"
        },
        "text": "Nisi voluptas debitis.",
        "likes": [],
        "createdAt": "2022-03-15T02:49:00.053Z",
        "updatedAt": "2022-03-15T02:49:00.053Z",
        "__v": 0,
        "dateAdded": "March 15, 2022",
        "numLikes": 0,
        "id": "622ffe9caa78d2996267f869"
    },
    {
        "_id": "622ffe9caa78d2996267f86b",
        "user": {
            "_id": "622ffe9baa78d2996267f827",
            "firstName": "Nels",
            "lastName": "Schneider",
            "fullName": "Nels Schneider",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f827"
        },
        "text": "Assumenda vero modi libero repellendus asperiores.",
        "likes": [],
        "createdAt": "2022-03-15T02:49:00.053Z",
        "updatedAt": "2022-03-15T02:49:00.053Z",
        "__v": 0,
        "dateAdded": "March 15, 2022",
        "numLikes": 0,
        "id": "622ffe9caa78d2996267f86b"
    }
  ];

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Comments postId="622ffe9baa78d2996267f834" updateCommentCount={jest.fn} updateKey={jest.fn}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Does not show error UI
  const error = screen.queryByText(/unable to load comments/i);
  expect(error).not.toBeInTheDocument();

  // Loaders are hidden
  const skeleton = screen.queryByTestId('skeleton');
  expect(skeleton).not.toBeInTheDocument();

  const allComments = screen.getAllByRole('article');
  expect(allComments.length).toBe(3);
});

it('Renders skeleton loaders at appropriate time', () => {
  mockComments = null;
  mockLoading = true;
  mockError = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Comments postId="622ffe9baa78d2996267f834" updateCommentCount={jest.fn} updateKey={jest.fn}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Does not show error UI
  const error = screen.queryByText(/unable to load comments/i);
  expect(error).not.toBeInTheDocument();
  
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);
});

it('Renders error message at appropriate time', () => {
  mockComments = null;
  mockLoading = false;
  mockError = true;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Comments postId="622ffe9baa78d2996267f834" updateCommentCount={jest.fn} updateKey={jest.fn}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const error = screen.getByText(/unable to load comments/i);
  expect(error).toBeInTheDocument();

  // Loaders are hidden
  const skeleton = screen.queryByTestId('skeleton');
  expect(skeleton).not.toBeInTheDocument();
});