import ProfileBio from "../components/ProfileBio";
import { render, screen } from "@testing-library/react";

const userBio = {
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

describe('Selective biography info rendering', () => {
  it("Renders only bio information available", () => {
    render(<ProfileBio profileUser={userBio} />);
    
    const location = screen.getByText(/philadelphia/i);
    const occupation = screen.getByText(/bartender/i);
    const education = screen.queryByText(/bird law/i);

    expect(location).toBeInTheDocument();
    expect(occupation).toBeInTheDocument();
    expect(education).not.toBeInTheDocument();
  });
  
});
