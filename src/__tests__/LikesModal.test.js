import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import LikesModal from "../components/modals/LikesModal";

// Customise loading/error/data states to properly test UI in different states
let mockLoading;
let mockLikes;
let mockError;

jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockLikes,
    loading: mockLoading,
    error: mockError
  }),
}));

it("Renders all likes provided", () => {
  mockLoading = false;
  mockError = null;
  mockLikes = [
    {
        "_id": "622ffe9baa78d2996267f821",
        "firstName": "Kendrick",
        "lastName": "Purdy",
        "fullName": "Kendrick Purdy",
        "dateJoined": "Invalid DateTime",
        "id": "622ffe9baa78d2996267f821"
    },
    {
        "_id": "622ffe9baa78d2996267f81f",
        "firstName": "Wilton",
        "lastName": "Jacobs",
        "fullName": "Wilton Jacobs",
        "dateJoined": "Invalid DateTime",
        "id": "622ffe9baa78d2996267f81f"
    },
    {
        "_id": "622ffe9baa78d2996267f820",
        "firstName": "Jacey",
        "lastName": "Kunze",
        "fullName": "Jacey Kunze",
        "dateJoined": "Invalid DateTime",
        "id": "622ffe9baa78d2996267f820"
    }
  ];

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikesModal closeModal={jest.fn} postId='testId'/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders hidden
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);

  // Error UI hidden
  const error = screen.queryByText(/error/i);
  expect(error).not.toBeInTheDocument();

  // Likes visible
  const likes = screen.getAllByRole('listitem');
  const likesCount = screen.getByText('3 likes');

  expect(likes.length).toBe(3);
  expect(likesCount).toBeInTheDocument();
});

it("Renders loaders correctly", () => {
  mockLoading = true;
  mockError = null;
  mockLikes = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikesModal closeModal={jest.fn} postId='testId'/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders shown
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);

  // Error UI hidden
  const error = screen.queryByText(/error/i);
  expect(error).not.toBeInTheDocument();
});

it("Renders error UI appropriately", () => {
  mockLoading = false;
  mockError = true;
  mockLikes = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikesModal closeModal={jest.fn} postId='testId'/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders hidden
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);

  // Error UI visible
  const error = screen.getByText(/error/i);
  expect(error).toBeInTheDocument();
});