import ProfileFriends from "../components/ProfileFriends";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

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
        <ProfileFriends />
      </AuthContextProvider>
    </BrowserRouter>
  );

  const friends = screen.queryAllByRole('img');
  expect(friends.length).toBe(0);
});

// Use images as markers for friends. All friend DOM elements will contain an image
it("Renders all friends in the friend list if the list contains less than 9 friends", () => {
    // Use friends list with >9 users
    mockFriends = {
      // Four friends here
    };

    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ProfileFriends />
        </AuthContextProvider>
      </BrowserRouter>
    );

    const friends = screen.queryAllByRole('img');
    expect(friends.length).toBe(4);
});

it("Renders only a maximum of 9 friends if the friends list contains more than 9 friends", () => {
    // Use friends list with >9 users
    mockFriends = {
      // 10+ friends here
    };

    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ProfileFriends />
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const friends = screen.queryAllByRole('img');
    expect(friends.length).toBe(9);
});
