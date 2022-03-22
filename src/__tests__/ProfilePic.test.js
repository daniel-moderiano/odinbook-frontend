import { render, screen } from "@testing-library/react";
import ProfilePic from '../components/utils/ProfilePic'

it("Displays only blank profile pic when no image URL is available for profile pic", () => {
  render(<ProfilePic imgUrl={null}/>);
  const blank = screen.getByAltText(/blank profile picture/i) 
  expect(blank).toBeInTheDocument();

  const pic = screen.queryByAltText(/^profile picture/i);
  expect(pic).not.toBeInTheDocument();
});

it("Displays correct profile picture if an image URL is provided", () => {
  render(<ProfilePic imgUrl={'https://randomuser.me/api/portraits/women/14.jpg'}/>);
  const pic = screen.getByAltText(/^profile picture/i);
  expect(pic).toBeInTheDocument();

  // Check for blank profile pic that should not be present
  const blank = screen.queryByAltText(/blank profile picture/i);
  expect(blank).not.toBeInTheDocument();
});
