import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import FriendRequests from "../components/FriendRequests";

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

it("Renders all incoming friend requests", () => {
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
    "outgoingRequests": []
  }

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <FriendRequests />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Search singular request by friend name
  const friends = screen.getByText(/tate/i);
  expect(friends).toBeInTheDocument();
});

it("Renders all outgoing/sent friend requests", () => {
  mockLoading = false;
  mockError = null;
  mockFriends = {
    "acceptedFriends": [],
    "incomingRequests": [],
    "outgoingRequests": [
      {
        "user": {
            "_id": "622ffe9baa78d2996267f829",
            "firstName": "Tate",
            "lastName": "Prohaska",
            "fullName": "Tate Prohaska",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f829"
        },
        "status": "outgoingRequest",
        "_id": "6230762de5936743db38c389"
      }
    ]
  }

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <FriendRequests />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Search singular request by friend name
  const friends = screen.getByText(/tate/i);
  expect(friends).toBeInTheDocument();
});

it("Renders 'no requests' message for users with no outgoing or incoming requests", () => {
  mockLoading = false;
  mockError = null;
  mockFriends = {
    "acceptedFriends": [],
    "incomingRequests": [],
    "outgoingRequests": []
  }

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <FriendRequests />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const messages = screen.getAllByText(/no requests/i);
  expect(messages.length).toBe(2);
});

it("Renders loaders correctly", () => {
  mockLoading = true;
  mockError = null;
  mockFriends = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
        <FriendRequests />
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
          <FriendRequests />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Loaders hidden
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);

  // Error UI visible (one for each of incoming and sent request sections)
  const errors = screen.getAllByText(/unable to load requests/i);
  expect(errors.length).toBe(2);
});