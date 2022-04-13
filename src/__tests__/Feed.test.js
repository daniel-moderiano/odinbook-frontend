import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Feed from "../components/Feed";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

let mockLoading;
let mockPosts;

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
    error: null
  }),
}));

it("Displays skeleton loaders when fetch data is loading", () => {
  mockLoading = true;   // Data is loading
  mockPosts = null;

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Feed />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
 
  const loaders = screen.getAllByTestId('skeleton');
  expect(loaders.length > 0).toBe(true);
});

it("Displays all posts when fetch data has loaded (skeleton loaders disappear)", () => {
  mockLoading = false;    // Data has loaded
  // 3 posts in array
  mockPosts = [
    {
      "_id": "622ffe9baa78d2996267f836",
      "user": {
          "_id": "622ffe9baa78d2996267f824",
          "firstName": "Arvid",
          "lastName": "Kulas",
          "fullName": "Arvid Kulas",
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
          "_id": "622ffe9baa78d2996267f824",
          "firstName": "Arvid",
          "lastName": "Kulas",
          "fullName": "Arvid Kulas",
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
  {
      "image": {
          "imageUrl": "http://placeimg.com/640/480"
      },
      "_id": "622ffe9baa78d2996267f83f",
      "user": {
          "_id": "622ffe9baa78d2996267f824",
          "firstName": "Arvid",
          "lastName": "Kulas",
          "fullName": "Arvid Kulas",
          "dateJoined": "Invalid DateTime",
          "id": "622ffe9baa78d2996267f824"
      },
      "text": "Ut corporis quidem consequatur voluptatem ipsa doloribus qui. Nostrum ipsum numquam expedita vitae est. Adipisci sint commodi qui illo. Nulla maiores enim.",
      "likes": [
          "622ffeb44dc1fd166b08b3ce"
      ],
      "comments": [
          "622ffe9caa78d2996267f857"
      ],
      "createdAt": "2022-03-15T02:49:00.056Z",
      "updatedAt": "2022-03-23T10:18:32.282Z",
      "__v": 1,
      "numLikes": 1,
      "numComments": 1,
      "datePosted": "March 15, 2022",
      "id": "622ffe9baa78d2996267f83f"
    },
  ];

  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Feed />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Each post is an HTML accessible article component
  const posts = screen.getAllByRole('article');
  expect(posts.length).toBe(3);

  const loaders = screen.queryAllByTestId('skeleton');
  expect(loaders.length).toBe(0);
});
