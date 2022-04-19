import ProfileHeader from "../components/ProfileHeader";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ToastContextProvider } from "../context/ToastContext";
import { AuthContextProvider } from "../context/AuthContext";

const user = {
  "profilePic": {
    "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
  },
  "_id": "622ffeb44dc1fd166b08b3ce",
  "firstName": "Chardee",
  "lastName": "McDennis",
  "email": "chardee.mcdennis@gmail.com",
  "friends": [
    {
      "user": "622ffe9baa78d2996267f831",
      "status": "friend",
      "_id": "6230762de5936743db38c345"
    },
  ],
  "createdAt": "2022-03-15T02:49:24.460Z",
  "updatedAt": "2022-03-15T11:19:10.042Z",
  "__v": 0,
  "fullName": "Chardee McDennis",
  "dateJoined": "March 15, 2022",
  "id": "622ffeb44dc1fd166b08b3ce"
}

const userNoPic = {
  "_id": "622ffeb44dc1fd166b08b3ce",
  "firstName": "Chardee",
  "lastName": "McDennis",
  "email": "chardee.mcdennis@gmail.com",
  "friends": [
    {
      "user": "622ffe9baa78d2996267f831",
      "status": "friend",
      "_id": "6230762de5936743db38c345"
    },
  ],
  "createdAt": "2022-03-15T02:49:24.460Z",
  "updatedAt": "2022-03-15T11:19:10.042Z",
  "__v": 0,
  "fullName": "Chardee McDennis",
  "dateJoined": "March 15, 2022",
  "id": "622ffeb44dc1fd166b08b3ce"
}

// Mock useFetchGet to return a pre-defined users object
jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({
    user: user
  }),
}));

describe('Profile header buttons', () => {
  it("Shows add friend button when viewing a profile for a non-friend", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <ProfileHeader profileUser={user} profileType="nonFriend" />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /add friend/i });
    expect(btn).toBeInTheDocument();

    // Check for presence of incorrect buttons
    const otherBtns = screen.queryByRole('button', { name: /friends|edit/i });
    expect(otherBtns).not.toBeInTheDocument();
  });

  it("Shows edit profile button when viewing your own profile", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <ProfileHeader profileUser={user} profileType="ownProfile" />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /edit profile/i });
    expect(btn).toBeInTheDocument();

    // Check for presence of incorrect buttons
    const otherBtns = screen.queryByRole('button', { name: /friends|add/i });
    expect(otherBtns).not.toBeInTheDocument();
  });

  it("Shows only unfriend button when viewing a profile of a friend", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <ProfileHeader profileUser={user} profileType="friend" />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /unfriend/i });
    expect(btn).toBeInTheDocument();

    // Check for presence of incorrect buttons
    const otherBtns = screen.queryByRole('button', { name: /edit|add/i });
    expect(otherBtns).not.toBeInTheDocument();
  });

  it('shows profile pic update modal on camera btn click', () => {
    render(
      <BrowserRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <ProfileHeader profileUser={user} profileType="ownProfile" />
          </AuthContextProvider>
        </ToastContextProvider>
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /change/i });
    userEvent.click(btn);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  })
});




