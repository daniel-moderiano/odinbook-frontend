import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import UserList from '../components/UserList';
import { ToastContextProvider } from "../context/ToastContext";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

const friends = {
  acceptedFriends: [
    {user: {
      "profilePic": {
          "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
      },
      "_id": "622ffe9baa78d2996267f831",
      "firstName": "Vivienne",
      "lastName": "Klein",
      "fullName": "Vivienne Klein",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f831"
  },},
  ],
  outgoingRequests: [],
  incomingRequests: [],
};

let mockError;
let mockLoading;
let mockUsers;

// Mock useFetchGet to return a pre-defined users object
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockUsers,
    loading: mockLoading,
    error: mockError,
  }),
}));

// Mock useFetchGet to return a pre-defined users object
jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

it("Renders all relevant users with provided users list of 3 users (i.e. skips related users)", () => {
  mockError = null;
  mockLoading = false;
  mockUsers = {
    "users": [
        {
            "_id": "622ffe9baa78d2996267f832",
            "firstName": "Bertrand",
            "lastName": "Bradtke",
            "fullName": "Bertrand Bradtke",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f832"
        },
        {
            "profilePic": {
                "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
            },
            "_id": "622ffe9baa78d2996267f831",
            "firstName": "Vivienne",
            "lastName": "Klein",
            "fullName": "Vivienne Klein",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f831"
        },
        {
            "profilePic": {
                "imageUrl": "https://res.cloudinary.com/dy2ycpgo4/image/upload/v1647415184/odinbook/ghandi-square_tvyvy9.png"
            },
            "_id": "622ffe9baa78d2996267f821",
            "firstName": "Chardee",
            "lastName": "McDennis",
            "fullName": "Chardee McDennis",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f821"
        }
    ]
  };

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <UserList userFriends={friends}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
  const userCards = screen.queryAllByRole('img') 
  const currentUserCard = screen.queryByText(/chardee mcdennis/i);
  const friendUserCard = screen.queryByText(/vivienne klein/i) ;

  expect(currentUserCard).not.toBeInTheDocument(); 
  expect(friendUserCard).not.toBeInTheDocument();
  expect(userCards.length).toBe(1);
});

it("Renders loaders correctly", () => {
  mockLoading = true;
  mockError = null;
  mockUsers = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <UserList userFriends={friends}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders shown
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);

  // Error UI hidden
  const error = screen.queryByText(/unable to load users/i);
  expect(error).not.toBeInTheDocument();
});

it("Renders error UI appropriately", () => {
  mockLoading = false;
  mockError = true;
  mockUsers = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <UserList userFriends={friends}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders hidden
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);

  // Error UI visible
  const error = screen.getByText(/unable to load users/i);
  expect(error).toBeInTheDocument();
});

 