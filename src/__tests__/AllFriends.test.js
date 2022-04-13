import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import AllFriends from "../components/AllFriends";

// Customise loading/error/data states to properly test UI in different states
let mockLoading;
let mockFriends;
let mockError;

jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockFriends,
    loading: mockLoading,
    error: mockError
  }),
}));

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

it("Renders all current friends", () => {
  mockLoading = false;
  mockError = null;
  mockFriends = {
    "acceptedFriends": [
        {
            "user": {
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
            "status": "friend",
            "_id": "6230762de5936743db38c345"
        },
        {
            "user": {
                "_id": "622ffe9baa78d2996267f823",
                "firstName": "Fidel",
                "lastName": "Ruecker",
                "fullName": "Fidel Ruecker",
                "dateJoined": "Invalid DateTime",
                "id": "622ffe9baa78d2996267f823"
            },
            "status": "friend",
            "_id": "6230762de5936743db38c346"
        },
        {
            "user": {
                "_id": "622ffe9baa78d2996267f820",
                "firstName": "Jacey",
                "lastName": "Kunze",
                "fullName": "Jacey Kunze",
                "dateJoined": "Invalid DateTime",
                "id": "622ffe9baa78d2996267f820"
            },
            "status": "friend",
            "_id": "6230762de5936743db38c347"
        },
    ],
    "incomingRequests": [
        {
            "user": {
                "_id": "622ffe9baa78d2996267f829",
                "firstName": "Tate",
                "lastName": "Prohaska",
                "fullName": "Tate Prohaska",
                "dateJoined": "Invalid DateTime",
                "id": "622ffe9baa78d2996267f829"
            },
            "status": "incomingRequest",
            "_id": "6230762de5936743db38c389"
        }
    ],
    "outgoingRequests": [
        {
            "user": {
                "_id": "622ffe9baa78d2996267f828",
                "firstName": "Isac",
                "lastName": "Conroy",
                "fullName": "Isac Conroy",
                "dateJoined": "Invalid DateTime",
                "id": "622ffe9baa78d2996267f828"
            },
            "status": "outgoingRequest",
            "_id": "6230762de5936743db38c312"
        }
    ]
  }

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <AllFriends />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders hidden
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);

  // Error UI hidden
  const error = screen.queryByText(/unable to load friends/i);
  expect(error).not.toBeInTheDocument();

  // Friends visible
  const friends = screen.getAllByRole('button', { name: /unfriend/i });
  expect(friends.length).toBe(3);
});

it("Renders no friends message when the user has no current friends", () => {
  mockLoading = false;
  mockError = null;
  mockFriends = {
    "acceptedFriends": [],
    "incomingRequests": [
        {
            "user": {
                "_id": "622ffe9baa78d2996267f829",
                "firstName": "Tate",
                "lastName": "Prohaska",
                "fullName": "Tate Prohaska",
                "dateJoined": "Invalid DateTime",
                "id": "622ffe9baa78d2996267f829"
            },
            "status": "incomingRequest",
            "_id": "6230762de5936743db38c389"
        }
    ],
    "outgoingRequests": [
        {
            "user": {
                "_id": "622ffe9baa78d2996267f828",
                "firstName": "Isac",
                "lastName": "Conroy",
                "fullName": "Isac Conroy",
                "dateJoined": "Invalid DateTime",
                "id": "622ffe9baa78d2996267f828"
            },
            "status": "outgoingRequest",
            "_id": "6230762de5936743db38c312"
        }
    ]
  }

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <AllFriends />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Friends visible
  const friends = screen.queryAllByRole('button', { name: /unfriend/i });
  expect(friends.length).toBe(0);
});

it("Renders loaders correctly", () => {
  mockLoading = true;
  mockError = null;
  mockFriends = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
        <AllFriends />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders shown
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);

  // Error UI hidden
  const error = screen.queryByText(/unable to load friends/i);
  expect(error).not.toBeInTheDocument();
});

it("Renders error UI appropriately", () => {
  mockLoading = false;
  mockError = true;
  mockFriends = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <AllFriends />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders hidden
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);

  // Error UI visible
  const error = screen.getByText(/unable to load friends/i);
  expect(error).toBeInTheDocument();
});