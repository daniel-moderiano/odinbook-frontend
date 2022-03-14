import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from '../components/utils/Input'

describe("Input handling", () => {
  it("calls onChange correct number of times", () => {
    const onChangeMock = jest.fn();
    render(<Input onChange={onChangeMock} />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, "Hello");

    expect(onChangeMock).toHaveBeenCalledTimes(5);
  });

  it("is not a required field by default", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute('required');
  });
});