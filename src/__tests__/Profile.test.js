import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Profile from "../components/Profile";

let mockResponse;
let mockLoading;

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
    error: null,
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

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Profile profileView="main"/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const spinner = screen.getByRole('status');
  expect(spinner).toBeInTheDocument();
});

it("Hides loading spinner once fetched data has loaded", () => {
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
            {
                "user": "622ffe9baa78d2996267f824",
                "status": "friend",
                "_id": "62393fb4341ff6f85fcc4aac"
            },
            {
                "user": "623a86a4a4637528c0bcf712",
                "status": "friend",
                "_id": "623a870ba4637528c0bcf80d"
            },
            {
                "user": "622ffe9baa78d2996267f831",
                "status": "outgoingRequest",
                "_id": "623a9b65a4637528c0bcfdb6"
            },
            {
                "user": "622ffe9baa78d2996267f820",
                "status": "outgoingRequest",
                "_id": "623a9ce0a4637528c0bcfe80"
            },
            {
                "user": "622ffe9baa78d2996267f823",
                "status": "outgoingRequest",
                "_id": "623a9ceaa4637528c0bcfe9a"
            },
            {
                "user": "622ffe9baa78d2996267f825",
                "status": "outgoingRequest",
                "_id": "623a9d14a4637528c0bcfea8"
            },
            {
                "user": "622ffe9baa78d2996267f821",
                "status": "outgoingRequest",
                "_id": "623ab433b419f0bb8a6db79b"
            },
            {
                "user": "623e54c4d956308f27ea9d64",
                "status": "friend",
                "_id": "623e54cad956308f27ea9d7b"
            }
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

  const spinner = screen.queryByRole('status');
  expect(spinner).not.toBeInTheDocument();

  // Check profile has loaded
  const header = screen.getByText('Chardee McDennis');
  expect(header).toBeInTheDocument();
});