import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from '../components/TextInput'

describe("Input handling", () => {
  it("calls onChange correct number of times", () => {
    const onChangeMock = jest.fn();
    render(<TextInput onChange={onChangeMock} />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, "Hello");

    expect(onChangeMock).toHaveBeenCalledTimes(5);
  });

  it("is not a required field by default", () => {
    render(<TextInput />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute('required');
  });

  it("input has correct values", () => {
    const onChangeMock = jest.fn();
    render(<TextInput onChange={onChangeMock} />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, "Whale");

    expect(input).toHaveValue("Whale");
  });
});