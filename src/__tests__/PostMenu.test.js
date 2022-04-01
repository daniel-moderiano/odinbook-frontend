import { render, screen } from "@testing-library/react";
import PostMenu from "../components/PostMenu";
import userEvent from "@testing-library/user-event";

it("Calls deletePost function on when clicking the delete option", () => {
  const deletePostMock = jest.fn();
  render(<PostMenu closeMenu={jest.fn} deletePost={deletePostMock} />);
  
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  userEvent.click(deleteBtn);

  expect(deletePostMock).toHaveBeenCalledTimes(1);
});

it("Calls editPost function on when clicking the edit option", () => {
  const editPostMock = jest.fn();
  render(<PostMenu closeMenu={jest.fn} editPost={editPostMock}/>);
  
  const deleteBtn = screen.getByRole('button', { name: /edit/i });
  userEvent.click(deleteBtn);

  expect(editPostMock).toHaveBeenCalledTimes(1);
});