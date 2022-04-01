import { render, screen } from "@testing-library/react";
import PostMenu from "../components/PostMenu";

it('Hides menu by default', () => {
  render(<PostMenu />);

  const menu = screen.queryByTestId('post-menu');
  expect(menu).not.toBeInTheDocument();
});

it('Renders menu when showMenu is set to true', () => {
  render(<PostMenu showMenu={true}/>);
  
  const menu = screen.getByTestId('post-menu');
  expect(menu).toBeInTheDocument();
});