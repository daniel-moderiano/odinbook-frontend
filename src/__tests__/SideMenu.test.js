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
    "numFriends": 2,
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
  useAuthContext: () => user.user,
}));

// Customise loading/error/data states to properly test UI in different states
let mockUser;
let mockLoading;
let mockError;

jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockUser,
    loading: mockLoading,
    error: mockError
  }),
}));

describe("User profile rendering in sidebar", () => {
  it("Displays only a blank profile pic when no image URL for profile pic is available", () => {
    mockUser = {
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
        "numFriends": 2,
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
    mockLoading = false;
    mockError = null;

    render(
      <BrowserRouter>
        <AuthContextProvider>
          <SideMenu />
        </AuthContextProvider>
      </BrowserRouter>
    );
    const blankPic = screen.getByAltText(/^blank profile picture/i) 
    expect(blankPic).toBeInTheDocument();

    // Check that no other profile pic is attempting to be rendered (normal profile images have the alt text below)
    const otherPic = screen.queryAllByAltText(/^profile picture/i) 
    expect(otherPic.length).toBe(0);
  });

  it("Displays correct number of friends", () => {
    mockUser = {
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
        "numFriends": 2,
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
    mockLoading = false;
    mockError = null;

    render(
      <BrowserRouter>
        <AuthContextProvider>
          <SideMenu />
        </AuthContextProvider>
      </BrowserRouter>
    );

    const friends = screen.getByText(/2 friends/i) 
    expect(friends).toBeInTheDocument();
  });
});

describe('Error and loading states', () => {
  it("Hides loading state on successful data load", () => {
    mockUser = {
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
        "numFriends": 2,
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
    mockLoading = false;
    mockError = null;

    render(
      <BrowserRouter>
        <AuthContextProvider>
          <SideMenu />
        </AuthContextProvider>
      </BrowserRouter>
    );

    // Loaders hidden
    const loaders = screen.queryAllByTestId('skeleton');
    expect(loaders.length).toBe(0);
  });

  it("Renders loaders correctly", () => {
    mockLoading = true;
    mockError = null;
    mockUser = null;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <SideMenu />
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    // Loaders shown
    const loaders = screen.getAllByTestId('skeleton');
    expect(loaders.length > 0).toBe(true);
  });
  
  it("Renders fallback (error) UI appropriately", () => {
    mockLoading = false;
    mockError = true;
    mockUser = null;
  
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <SideMenu />
        </AuthContextProvider>
      </BrowserRouter>
    );
  
    // Friends will not be fetched
    const friends = screen.queryByText(/2 friends/i) 
    expect(friends).not.toBeInTheDocument();

    // Name will be available through context user
    const name = screen.getByText(/john/i) 
    expect(name).toBeInTheDocument();
  });
})