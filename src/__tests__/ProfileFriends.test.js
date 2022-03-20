import ProfileFriends from "../components/ProfileFriends";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

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

// Mock useFetchGet to return a pre-defined friends object that can be customised for different tests
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockFriends,
    loading: null,
    error: null
  }),
}));

// Mock useFetchGet to return a pre-defined users object
jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

it("Displays a 'no friends' message when the user has no friends", () => {
  // Use friends list with no users
  mockFriends = {};

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ProfileFriends profileUser={currentUser}/>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const friends = screen.queryAllByRole('img');
  expect(friends.length).toBe(0);
});

// Use images as markers for friends. All friend DOM elements will contain an image
it("Renders all friends in the friend list if the list contains less than 9 friends", () => {
    // Use friends list with <9 users (data in the exact form provided in app)
    mockFriends = { ...fewFriends }

    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ProfileFriends profileUser={currentUser}/>
        </AuthContextProvider>
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
        <AuthContextProvider>
          <ProfileFriends profileUser={currentUser}/>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const friends = screen.queryAllByRole('img');
    expect(friends.length).toBe(9);
});
