import { render, screen } from "@testing-library/react";
import PostMenu from "../components/PostMenu";
import userEvent from "@testing-library/user-event";

it("Calls deletePost function on when clicking the delete option", () => {
  const deletePostMock = jest.fn();
  render(<PostMenu closeMenu={jest.fn} handleDelete={deletePostMock} handleEdit={jest.fn}/>);
  
  const deleteBtn = screen.getByRole('menuitem', { name: /delete/i });
  userEvent.click(deleteBtn);

  expect(deletePostMock).toHaveBeenCalledTimes(1);
});

it("Calls editPost function on when clicking the edit option", () => {
  const editPostMock = jest.fn();
  render(<PostMenu closeMenu={jest.fn} handleEdit={editPostMock} handleDelete={jest.fn}/>);
  
  const editBtn = screen.getByRole('menuitem', { name: /edit/i });
  userEvent.click(editBtn);

  expect(editPostMock).toHaveBeenCalledTimes(1);
});

describe('Accessible keyboard menu navigation', () => {
  it("Focuses first item on menu open", () => {
    render(<PostMenu closeMenu={jest.fn} handleEdit={jest.fn()} handleDelete={jest.fn}/>);
    
    const firstItem = screen.getByText(/edit/i);
  
    expect(document.activeElement).toEqual(firstItem);
  });

  it("Moves focus down the list on down arrow key press", () => {
    render(<PostMenu closeMenu={jest.fn} handleEdit={jest.fn()} handleDelete={jest.fn}/>);
    
    const secondItem = screen.getByText(/delete/i);

    // Move down the menu
    userEvent.keyboard('{ArrowDown}');
  
    expect(document.activeElement).toEqual(secondItem);
  });

  it("Moves focus up the list on up arrow key press", () => {
    render(<PostMenu closeMenu={jest.fn} handleEdit={jest.fn()} handleDelete={jest.fn}/>);
    
    const firstItem = screen.getByText(/edit/i);
    const secondItem = screen.getByText(/delete/i);

    // Set focus on bottom of menu to start
    secondItem.focus();

    // Move up the menu
    userEvent.keyboard('{ArrowUp}');
  
    expect(document.activeElement).toEqual(firstItem);
  });

  
  it("Up arrow moves to bottom of list when already at top of list to begin", () => {
    render(<PostMenu closeMenu={jest.fn} handleEdit={jest.fn()} handleDelete={jest.fn}/>);
    
    const firstItem = screen.getByText(/edit/i);
    const secondItem = screen.getByText(/delete/i);

    // Set focus on bottom of menu to start
    secondItem.focus();

    // Move up the menu
    userEvent.keyboard('{ArrowDown}');
  
    expect(document.activeElement).toEqual(firstItem);
  });

  
  it("Down arrow moves focus to top of list when starting at the bottom", () => {
    render(<PostMenu closeMenu={jest.fn} handleEdit={jest.fn()} handleDelete={jest.fn}/>);
    
    const secondItem = screen.getByText(/delete/i);

    // Move up the menu
    userEvent.keyboard('{ArrowUp}');
  
    expect(document.activeElement).toEqual(secondItem);
  });
}, [])