import ProfileHeader from "../components/ProfileHeader";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

const user = {
    "profilePic": {
        "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
    },
    "_id": "622ffe9baa78d2996267f831",
    "firstName": "Vivienne",
    "lastName": "Klein",
    "fullName": "Vivienne Klein",
    "dateJoined": "Invalid DateTime",
    "id": "622ffe9baa78d2996267f831"
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

  it("Does not show add friend button when viewing a profile for a friend", () => {
    const btn = screen.queryByRole('button', { name: /add friend/i });
    expect(btn).not.toBeInTheDocument();
  });
  
  it("Shows friends/unfriend button when viewing a profile of a friend", () => {
    const btn = screen.getByRole('button', { name: /friends/i });
    expect(btn).toBeInTheDocument();
  });

  it("Does not show friends/unfriend button when viewing a profile of a non-friend", () => {
    const btn = screen.queryByRole('button', { name: /friends/i });
    expect(btn).not.toBeInTheDocument();
  });
});




 