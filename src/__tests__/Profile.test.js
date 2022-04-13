import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Profile from "../components/Profile";

let mockResponse;
let mockLoading;
let mockError;

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

jest.mock("../hooks/useFetchProfile", () => ({
  useFetchProfile: () => ({
    fetchProfile: jest.fn,
    profileUser: mockResponse,
    loading: mockLoading,
    error: mockError,
  }),
}));

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

it("Displays loading spinner on loading fetch data", () => {
  mockLoading = true;
  mockResponse = null;
  mockError = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Profile profileView="main"/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // No error UI present
  const error = screen.queryByText(/unable to load profile/i)
  expect(error).not.toBeInTheDocument();

  const spinner = screen.getByRole('status');
  expect(spinner).toBeInTheDocument();
});

it("Displays error message when profile fails to load", () => {
  mockLoading = false;
  mockResponse = null;
  mockError = true;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Profile profileView="main"/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
  
  // No loader
  const spinner = screen.queryByRole('status');
  expect(spinner).not.toBeInTheDocument();

  const error = screen.getByText(/unable to load profile/i)
  expect(error).toBeInTheDocument();
});

it("Hides loading spinner once fetched data has loaded", () => {
  mockError = null;
  mockLoading = false;
  mockResponse = {
    "user": {
        "bio": {
            "location": "Philadelphia",
            "occupation": "Bartender",
        },
        "_id": "622ffeb44dc1fd166b08b3ce",
        "firstName": "Chardee",
        "lastName": "McDennis",
        "email": "chardeemcdennis@gmail.com",
        "friends": [
            {
                "user": "622ffe9baa78d2996267f81f",
                "status": "friend",
                "_id": "6230762de5936743db38c348"
            },
        ],
        "createdAt": "2022-03-15T02:49:24.460Z",
        "updatedAt": "2022-03-31T23:14:17.812Z",
        "__v": 0,
        "fullName": "Chardee McDennis",
        "numFriends": 4,
        "dateJoined": "March 15, 2022",
        "id": "622ffeb44dc1fd166b08b3ce"
    }
  }

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Profile profileView="main"/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // No loader
  const spinner = screen.queryByRole('status');
  expect(spinner).not.toBeInTheDocument();

  // No error UI present
  const error = screen.queryByText(/unable to load profile/i)
  expect(error).not.toBeInTheDocument();

  // Check profile has loaded
  const header = screen.getByText('Chardee McDennis');
  expect(header).toBeInTheDocument();
});