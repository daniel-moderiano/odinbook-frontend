import { fireEvent, render, screen } from "@testing-library/react";
import ImageUploadBtn from "../components/buttons/ImageUploadBtn";

it("calls provided onChange func when image is added/value of input changed", () => {
  const onChangeMock = jest.fn();
  render(<ImageUploadBtn handleChange={onChangeMock} imageValue="" setImageValue={jest.fn} setImageFile={jest.fn}/>);
  
  const input = screen.getByTestId('input');
  fireEvent.change(input);
  fireEvent.change(input);

  expect(onChangeMock).toHaveBeenCalledTimes(2);
});

