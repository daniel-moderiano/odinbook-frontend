import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import FriendsHome from "../components/FriendsHome";

const currentUser = {
  "profilePic": {
      "imageId": "odinbook/abadhe3dfphb0a1cmqh4",
      "imageUrl": "https://res.cloudinary.com/dy2ycpgo4/image/upload/v1649749123/odinbook/abadhe3dfphb0a1cmqh4.png"
  },
  "_id": "6253eafa7c5f03b0906cc7b5",
  "firstName": "Peter",
  "lastName": "Parker",
  "email": "tobey@gmail.com",
  "fullName": "Peter Parker",
};

let mockLoading;
let mockFriends;
let mockError;

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

// Mock useFetchGet to return a pre-defined user object
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockFriends,
    loading: mockLoading,
    error: mockError
  }),
}));

it("Displays skeleton loaders when fetch data is loading", () => {
  mockLoading = true;   // Data is loading
  mockFriends = null;
  mockError = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <FriendsHome />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Ensure error UI is not present
  const error = screen.queryByText(/error/i);
  expect(error).not.toBeInTheDocument();
 
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);
});

it("Hides loading and error UI when data is fetched", () => {
  mockLoading = false;
  mockError = null;
  mockFriends = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <FriendsHome />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // ! Testing friend presentation data is impossible here without nested mocking of some sort. Likely requires splitting the component into two

  // Ensure error UI is not present
  const error = screen.queryByText(/error/i);
  expect(error).not.toBeInTheDocument();

  // Ensure loaders are not present
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(false);
});

it("Displays error UI only when an error occurs in fetching data", () => {
  mockLoading = false;
  mockError = true;
  mockFriends = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <FriendsHome />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const error = screen.getByText(/error/i);
  expect(error).toBeInTheDocument();

  // Ensure loaders are not present
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(false);
});