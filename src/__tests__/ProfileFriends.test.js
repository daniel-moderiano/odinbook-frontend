import ProfileFriends from "../components/ProfileFriends";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContextProvider } from "../context/ToastContext";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

const manyFriends = {
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
      {
          "user": {
              "_id": "622ffe9baa78d2996267f821",
              "firstName": "Kendrick",
              "lastName": "Purdy",
              "fullName": "Kendrick Purdy",
              "dateJoined": "Invalid DateTime",
              "id": "622ffe9baa78d2996267f821"
          },
          "status": "friend",
          "_id": "6230762de5936743db38c349"
      },
      {
        "user": {
            "profilePic": {
                "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
            },
            "_id": "622ffe9baa78d2996267f8aa",
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
            "_id": "622ffe9baa78d2996267f8ab",
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
            "_id": "622ffe9baa78d2996267f8ac",
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
            "_id": "622ffe9baa78d2996267f8ad",
            "firstName": "Wilton",
            "lastName": "Jacobs",
            "fullName": "Wilton Jacobs",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f81f"
        },
        "status": "friend",
        "_id": "6230762de5936743db38c348"
    },
    {
        "user": {
            "_id": "622ffe9baa78d2996267f8af",
            "firstName": "Kendrick",
            "lastName": "Purdy",
            "fullName": "Kendrick Purdy",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f821"
        },
        "status": "friend",
        "_id": "6230762de5936743db38c349"
    },
    {
      "user": {
          "profilePic": {
              "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
          },
          "_id": "622ffe9baa78d2996267f8bf",
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
            "_id": "622ffe9baa78d2996267f8rt",
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
            "_id": "622ffe9baa78d2996267f8qq",
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
            "_id": "622ffe9baa78d2996267f845",
            "firstName": "Wilton",
            "lastName": "Jacobs",
            "fullName": "Wilton Jacobs",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f81f"
        },
        "status": "friend",
        "_id": "6230762de5936743db38c348"
    },
    {
        "user": {
            "_id": "622ffe9baa78d2996267f8uo",
            "firstName": "Kendrick",
            "lastName": "Purdy",
            "fullName": "Kendrick Purdy",
            "dateJoined": "Invalid DateTime",
            "id": "622ffe9baa78d2996267f821"
        },
        "status": "friend",
        "_id": "6230762de5936743db38c349"
    }
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

const fewFriends = {
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
      {
          "user": {
              "_id": "622ffe9baa78d2996267f821",
              "firstName": "Kendrick",
              "lastName": "Purdy",
              "fullName": "Kendrick Purdy",
              "dateJoined": "Invalid DateTime",
              "id": "622ffe9baa78d2996267f821"
          },
          "status": "friend",
          "_id": "6230762de5936743db38c349"
      }
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
          <ProfileFriends profileUser={currentUser}/>
        </ToastContextProvider>
      </BrowserRouter>
    );
  
    const msg = screen.getByText(/no friends yet/i);
    expect(msg).toBeInTheDocument();
  });
  
  // Use images as markers for friends. All friend DOM elements will contain an image
  it("Renders all friends in the friend list if the list contains less than 9 friends", () => {
      // Use friends list with <9 users (data in the exact form provided in app)
      mockFriends = { ...fewFriends }
  
      render(
        <BrowserRouter>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <ProfileFriends profileUser={currentUser}/>
          </ToastContextProvider>
        </BrowserRouter>
      );
  
      const friends = screen.queryAllByRole('img');
      expect(friends.length).toBe(5);
  });
  
  it("Renders only a maximum of 9 friends if the friends list contains more than 9 friends", () => {
      // Use friends list with >9 users
      mockFriends = { ...manyFriends }
  
      render(
        <BrowserRouter>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <ProfileFriends profileUser={currentUser}/>
          </ToastContextProvider>
        </BrowserRouter>
      );
      
      const friends = screen.queryAllByRole('img');
      expect(friends.length).toBe(9);
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
          <ProfileFriends profileUser={currentUser}/>
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
          <ProfileFriends profileUser={currentUser}/>
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
          <ProfileFriends profileUser={currentUser}/>
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