import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import UserList from '../components/UserList';

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

const users = {
  "users": [
      {
          "_id": "622ffe9baa78d2996267f832",
          "firstName": "Bertrand",
          "lastName": "Bradtke",
          "fullName": "Bertrand Bradtke",
          "dateJoined": "Invalid DateTime",
          "id": "622ffe9baa78d2996267f832"
      },
      {
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
      {
          "profilePic": {
              "imageUrl": "https://res.cloudinary.com/dy2ycpgo4/image/upload/v1647415184/odinbook/ghandi-square_tvyvy9.png"
          },
          "_id": "622ffe9baa78d2996267f821",
          "firstName": "Chardee",
          "lastName": "McDennis",
          "fullName": "Chardee McDennis",
          "dateJoined": "Invalid DateTime",
          "id": "622ffe9baa78d2996267f821"
      }
  ]
}

// Mock useFetchGet to return a pre-defined users object
jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: users,
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

it("Renders all relevant users with provided users list of 3 users (skips current user)", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <UserList />
      </AuthContextProvider>
    </BrowserRouter>
  );
  const userCards = screen.queryAllByRole('img') 
  expect(userCards.length).toBe(2);
});

it("Does not render the current user in the user list", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <UserList />
      </AuthContextProvider>
    </BrowserRouter>
  );
  const userCard = screen.queryByText(/chardee mcdennis/i) 
  expect(userCard).not.toBeInTheDocument();
});

 