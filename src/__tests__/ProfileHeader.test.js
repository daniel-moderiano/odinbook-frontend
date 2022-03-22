import ProfileHeader from "../components/ProfileHeader";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

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

describe('Profile picture selective rendering', () => {
  it("Displays only blank profile pic when no image URL is available for profile pic", () => {
    render(
      <BrowserRouter>
        <ProfileHeader profileUser={userNoPic} />
      </BrowserRouter>
    );
    const blank = screen.getByAltText(/blank profile picture/i) 
    expect(blank).toBeInTheDocument();

    const pic = screen.queryByAltText(/^profile picture/i);
    expect(pic).not.toBeInTheDocument();
  });
  
  it("Displays correct profile picture if an image URL is provided", () => {
    render(
      <BrowserRouter>
        <ProfileHeader profileUser={user} />
      </BrowserRouter>
    );
    const pic = screen.getByAltText(/^profile picture/i);
    expect(pic).toBeInTheDocument();

    // Check for blank profile pic that should not be present
    const blank = screen.queryByAltText(/blank profile picture/i);
    expect(blank).not.toBeInTheDocument();
  });
});


describe('Profile header buttons', () => {
  it("Shows add friend button when viewing a profile for a non-friend", () => {
    render(
      <BrowserRouter>
        <ProfileHeader profileUser={user} profileType="nonFriend"/>
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
        <ProfileHeader profileUser={user} profileType="ownProfile"/>
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /edit profile/i });
    expect(btn).toBeInTheDocument();

    // Check for presence of incorrect buttons
    const otherBtns = screen.queryByRole('button', { name: /friends|add/i });
    expect(otherBtns).not.toBeInTheDocument();
  });

  it("Shows only friends/unfriend button when viewing a profile of a friend", () => {
    render(
      <BrowserRouter>
        <ProfileHeader profileUser={user} profileType="friend"/>
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /friends/i });
    expect(btn).toBeInTheDocument();

    // Check for presence of incorrect buttons
    const otherBtns = screen.queryByRole('button', { name: /edit|add/i });
    expect(otherBtns).not.toBeInTheDocument();
  });
});




 