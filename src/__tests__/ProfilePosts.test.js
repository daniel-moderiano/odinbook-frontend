import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import ProfilePosts from "../components/ProfilePosts";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

let mockLoading;
let mockPosts;
let mockError;

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

// Mock useFetchGet to return a pre-defined user object
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: mockPosts,
    loading: mockLoading,
    error: mockError,
  }),
}));

it("Displays skeleton loaders when fetch data is loading", () => {
  mockLoading = true;   // Data is loading
  mockPosts = null;
  mockError = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfilePosts profileUser={currentUser} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Error UI not present
  const error = screen.queryByText(/unable to load/i);
  expect(error).not.toBeInTheDocument();
 
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);
});

it("Displays error UI when fetch data fails", () => {
  mockLoading = false;   // Data is loading
  mockPosts = null;
  mockError = true;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfilePosts profileUser={currentUser} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Error UI present
  const error = screen.getByText(/unable to load/i);
  expect(error).toBeInTheDocument();
 
  // Loaders not present
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);
});

it("Displays all posts when fetch data has loaded (skeleton loaders disappear)", () => {
  mockLoading = false;    // Data has loaded
  // 3 posts in array
  mockPosts = [
    {
      "_id": "622ffe9baa78d2996267f836",
      "user": {
          "_id": "622ffe9baa78d2996267f821",
          "firstName": "Chardee",
          "lastName": "McDennis",
          "fullName": "Chardee McDennis",
          "dateJoined": "Invalid DateTime",
          "id": "622ffe9baa78d2996267f824"
      },
      "text": "Error est quo velit quos. Ea et non et magnam aut inventore totam. Rerum molestiae et.",
      "likes": [
          "622ffeb44dc1fd166b08b3ce"
      ],
      "comments": [
          "622ffe9baa78d2996267f847",
          "622ffe9baa78d2996267f84b",
          "622ffe9caa78d2996267f855"
      ],
      "createdAt": "2022-03-15T02:49:00.056Z",
      "updatedAt": "2022-03-25T00:33:02.419Z",
      "__v": 2,
      "numLikes": 1,
      "numComments": 3,
      "datePosted": "March 15, 2022",
      "id": "622ffe9baa78d2996267f836"
  },
  {
      "image": {
          "imageUrl": "http://placeimg.com/640/480"
      },
      "_id": "622ffe9baa78d2996267f83b",
      "user": {
          "_id": "622ffe9baa78d2996267f821",
          "firstName": "Chardee",
          "lastName": "McDennis",
          "fullName": "Chardee McDennis",
          "dateJoined": "Invalid DateTime",
          "id": "622ffe9baa78d2996267f824"
      },
      "text": "Fugit quibusdam asperiores assumenda voluptatem magnam quae ratione blanditiis. Eaque amet similique in id et qui dolor saepe velit. Sint perspiciatis officiis nostrum autem sed nihil. Iure est voluptate mollitia amet corrupti dicta ut.",
      "likes": [],
      "comments": [
          "622ffe9baa78d2996267f84d"
      ],
      "createdAt": "2022-03-15T02:49:00.056Z",
      "updatedAt": "2022-03-23T10:16:11.752Z",
      "__v": 1,
      "numLikes": 0,
      "numComments": 1,
      "datePosted": "March 15, 2022",
      "id": "622ffe9baa78d2996267f83b"
    },
  ];
  mockError = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfilePosts profileUser={currentUser} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Each post is an HTML accessible article component
  const posts = screen.getAllByRole('article');
  expect(posts.length).toBe(2);

  // Error UI not present
  const error = screen.queryByText(/unable to load/i);
  expect(error).not.toBeInTheDocument();

  // Loaders not present
  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);
});
