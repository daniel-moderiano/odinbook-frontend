import ProfileHeader from "../components/ProfileHeader";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ProfileHeader profileUser={user} />
      </AuthContextProvider>
    </BrowserRouter>
  )
});

describe('Profile picture selective rendering', () => {
  it("Displays blank profile pic when none are available for the user", () => {
    const pic = screen.getByAltText(/blank profile picture/i) 
    expect(pic).toBeInTheDocument();
  });
  
  it("Displays profile picture if an image URL is provided", () => {
    const pic = screen.getByAltText(/^profile picture/i);
    expect(pic).toBeInTheDocument();
  });

  it("Does not display a blank profile image if an image URL is provided", () => {
    const pic = screen.queryByAltText(/blank profile picture/i);
    expect(pic).not.toBeInTheDocument();
  });
});


describe('Profile header buttons', () => {
  it("Shows add friend button when viewing a profile for a non-friend", () => {
    const btn = screen.getByRole('button', { name: /add friend/i });
    expect(btn).toBeInTheDocument();
  });

  it("Shows edit profile button when viewing your own profile", () => {
    const btn = screen.getByRole('button', { name: /add friend/i });
    expect(btn).toBeInTheDocument();
  });

  it("Shows friends/unfriend button when viewing a profile of a friend", () => {
    const btn = screen.getByRole('button', { name: /friends/i });
    expect(btn).toBeInTheDocument();
  });

  it("Does not show add friend or edit profile button when viewing a profile for a friend", () => {
    const btn = screen.queryByRole('button', { name: /edit|add/i });
    expect(btn).not.toBeInTheDocument();
  });

  it("Does not show friends/unfriend or edit profile button when viewing a profile of a non-friend", () => {
    const btn = screen.queryByRole('button', { name: /friends|edit/i });
    expect(btn).not.toBeInTheDocument();
  });

  it("Does not show friends/unfriend or add friend button when viewing your own profile", () => {
    const btn = screen.queryByRole('button', { name: /friends|add/i });
    expect(btn).not.toBeInTheDocument();
  });
});




 