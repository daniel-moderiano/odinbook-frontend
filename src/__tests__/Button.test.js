import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from '../components/Button';

describe("Button features", () => {
  it("calls provided onClick func when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}/>);
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("adds appropriate styles based on design prop supplied", () => {
    render(<Button design="ghost"/>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it("adds custom styles to className", () => {
    render(<Button customStyles="md:font-bold"/>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('md:font-bold');
  });
});