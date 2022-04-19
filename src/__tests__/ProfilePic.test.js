import { render, screen } from "@testing-library/react";
import ProfilePic from '../components/utils/ProfilePic'

it("Displays only blank profile pic when no image URL is available for profile pic", () => {
  render(<ProfilePic imgUrl={null}/>);
  const blank = screen.getByAltText(/anonymous/i) 
  expect(blank).toBeInTheDocument();

  const pic = screen.queryByTestId('image');
  expect(pic).not.toBeInTheDocument();
});

it("Displays correct profile picture if an image URL is provided", () => {
  render(<ProfilePic image={{ imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg' }}/>);
  const pic = screen.getByTestId('image')
  expect(pic).toBeInTheDocument();

  // Check for blank profile pic that should not be present
  const blank = screen.queryByAltText(/anonymous/i);
  expect(blank).not.toBeInTheDocument();
});
