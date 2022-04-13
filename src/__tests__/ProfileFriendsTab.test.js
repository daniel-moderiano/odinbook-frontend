import ProfileFriendsTab from "../components/ProfileFriendsTab";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContextProvider } from "../context/ToastContext";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

// Initialise the variable here so the mock doesn't spit an undefined error
let mockFriends;
let mockLoading;
let mockError;

// Mock useFetchGet to return a pre-defined friends object that can be customised for different tests
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockFriends,
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

describe('Friend list rendering', () => {
  it("Displays a 'no friends' message when the user has no friends", () => {
    // Use friends list with no users
    mockFriends = {
      "acceptedFriends": []
    };
  
    render(
      <BrowserRouter>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfileFriendsTab profileUser={currentUser}/>
        </ToastContextProvider>
      </BrowserRouter>
    );
  
    const msg = screen.getByText(/no friends yet/i);
    expect(msg).toBeInTheDocument();
  });
  
  it("Renders all friends in the list", () => {
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
            {
                "user": {
                    "_id": "622ffe9baa78d2996267f81f",
                    "firstName": "Wilton",
                    "lastName": "Jacobs",
                    "fullName": "Wilton Jacobs",
                    "dateJoined": "Invalid DateTime",
                    "id": "622ffe9baa78d2996267f81f"
                },
                "status": "friend",
                "_id": "6230762de5936743db38c348"
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
      };
  
      render(
        <BrowserRouter>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <ProfileFriendsTab profileUser={currentUser}/>
          </ToastContextProvider>
        </BrowserRouter>
      );
      
      const friends = screen.queryAllByRole('img');
      expect(friends.length).toBe(4);
  });
});

describe('Error and loading states', () => {
  it("Hides loaders and error state when friend data is successfully fetched", () => {
    mockFriends = {
      "acceptedFriends": []
    };
    mockError = null;
    mockLoading = false;
  
    render(
      <BrowserRouter>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfileFriendsTab profileUser={currentUser}/>
        </ToastContextProvider>
      </BrowserRouter>
    );

    // Loaders hidden
    const loaders = screen.queryAllByTestId('skeleton');
    expect(loaders.length).toBe(0);

    // Error UI hidden
    const error = screen.queryByText(/unable to load friends/i);
    expect(error).not.toBeInTheDocument();
  });

  it("Renders loaders correctly", () => {
    mockLoading = true;
    mockError = null;
    mockFriends = null;
  
    render(
      <BrowserRouter>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfileFriendsTab profileUser={currentUser}/>
        </ToastContextProvider>
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
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfileFriendsTab profileUser={currentUser}/>
        </ToastContextProvider>
      </BrowserRouter>
    );

    // Loaders hidden
    const loaders = screen.queryAllByTestId('skeleton');
    expect(loaders.length).toBe(0);
  
    // Error UI visible
    const error = screen.getByText(/unable to load friends/i);
    expect(error).toBeInTheDocument();
  });
})