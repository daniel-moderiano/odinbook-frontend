import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StyledLink from '../components/StyledLink';
import { BrowserRouter } from "react-router-dom";

describe("link features", () => {
  it("calls provided onClick func when clicked", () => {
    const onClickMock = jest.fn();
    render(
      <BrowserRouter>
        <StyledLink onClick={onClickMock} to="/" />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');

    userEvent.click(link);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("adds appropriate styles based on design prop supplied", () => {
    render(
      <BrowserRouter>
        <StyledLink design="btn-ghost" to="/"/>
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-white');
  });

  it("adds custom styles to className", () => {
    render(
      <BrowserRouter>
        <StyledLink customStyles="md:font-bold" to="/"/>
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('md:font-bold');
  });
});