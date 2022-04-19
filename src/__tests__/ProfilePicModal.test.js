import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import ProfilePicModal from '../components/modals/ProfilePicModal';
import userEvent from "@testing-library/user-event";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

const profile = {
  "profilePic": {
    "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
  },
  "_id": "622ffeb44dc1fd166b08b3ce",
  "firstName": "Chardee",
  "lastName": "McDennis",
  "email": "chardee.mcdennis@gmail.com",
  "createdAt": "2022-03-15T02:49:24.460Z",
  "updatedAt": "2022-03-15T11:19:10.042Z",
  "__v": 0,
  "fullName": "Chardee McDennis",
  "dateJoined": "March 15, 2022",
  "id": "622ffeb44dc1fd166b08b3ce",
  "bio": {
    "location": "Philadelphia",
    "occupation": "Bartender",
  },
}

const profileNoPic = {
  "_id": "622ffeb44dc1fd166b08b3ce",
  "firstName": "Chardee",
  "lastName": "McDennis",
  "email": "chardee.mcdennis@gmail.com",
  "createdAt": "2022-03-15T02:49:24.460Z",
  "updatedAt": "2022-03-15T11:19:10.042Z",
  "__v": 0,
  "fullName": "Chardee McDennis",
  "dateJoined": "March 15, 2022",
  "id": "622ffeb44dc1fd166b08b3ce",
  "bio": {
    "location": "Philadelphia",
    "occupation": "Bartender",
  },
}

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

it("Renders current profile picture if one is present", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfilePicModal profileUser={profile} closeModal={jest.fn} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const img = screen.getByRole('img');
  expect(img).toBeInTheDocument();
});

it("Renders no picture message when no profile picture exists", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfilePicModal profileUser={profileNoPic} closeModal={jest.fn} />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const img = screen.queryByRole('img');
  const message = screen.getByText(/no picture/i)

  expect(img).not.toBeInTheDocument();
  expect(message).toBeInTheDocument();
});


