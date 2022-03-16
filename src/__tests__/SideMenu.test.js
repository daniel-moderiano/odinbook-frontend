import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import SideMenu from '../components/SideMenu';

const user = {
  user: {
    "_id": "622f19ab4212d0e69e8eb0d4",
    "user": {
        "_id": "622f19ab4212d0e69e8eb0b9",
        "firstName": "John",
        "lastName": "Doe",
        "fullName": "John Doe",
        "id": "622f19ab4212d0e69e8eb0b9"
    },
    "text": "Test post",
    "likes": [
      {
        "_id": "622f19ac4212d0e69e8eb0ef",
      },
      {
        "_id": "622f19ac4212d0e69e8eb0ef",
      },
    ],
    "friends": [
      'friend1',
      'friend2'
    ],
    "comments": [
        {
            "_id": "622f19ac4212d0e69e8eb0ef",
            "user": "622f19ab4212d0e69e8eb0bf",
            "text": "Et distinctio autem voluptatem voluptatem maiores reiciendis laborum voluptas et.",
            "likes": [],
            "createdAt": "2022-03-14T10:32:12.061Z",
            "updatedAt": "2022-03-14T10:32:12.061Z",
            "__v": 0,
            "id": "622f19ac4212d0e69e8eb0ef"
        }
    ],
    "numComments": 1,
    "numLikes": 2,
    "createdAt": "2022-03-14T10:32:12.064Z",
    "updatedAt": "2022-03-14T10:32:12.064Z",
    "__v": 0,
    "id": "622f19ab4212d0e69e8eb0d4"
  }
};

// Mock useAuthContext to return a pre-defined user object
jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => (user.user),
}));

// Mock useFetchGet to return a pre-defined user object
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: user,
    loading: null,
    error: null
  }),
}));


describe("User profile rendering in sidebar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthContextProvider user={user}>
          <SideMenu />
        </AuthContextProvider>
      </BrowserRouter>
    );
  })

  it("Displays blank profile pic when none are available", () => {
    const pic = screen.getByAltText(/^blank profile picture/i) 
    expect(pic).toBeInTheDocument();
  });

  it("Does not attempt to show a unique profile picture when one is not provided", () => {
    const pic = screen.queryAllByAltText(/^profile picture/i) 
    expect(pic.length).toBe(0);
  });

  it("Displays correct number of friends", () => {
    const friends = screen.getByText(/2 friends/i) 
    expect(friends).toBeInTheDocument();
  });

});