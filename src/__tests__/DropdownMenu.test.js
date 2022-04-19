import { render, screen } from "@testing-library/react";
import DropdownMenu from "../components/DropdownMenu";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import userEvent from "@testing-library/user-event";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

describe('Accessible keyboard menu navigation', () => {
  it("Focuses first item on menu open", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <DropdownMenu closeMenu={jest.fn} />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const firstItem = screen.getByText(/view profile/i);
  
    expect(document.activeElement).toEqual(firstItem);
  });

  it("Moves focus down the list on down arrow key press", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <DropdownMenu closeMenu={jest.fn} />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const secondItem = screen.getByText(/settings/i);

    // Move down the menu
    userEvent.keyboard('{ArrowDown}');
  
    expect(document.activeElement).toEqual(secondItem);
  });

  it("Moves focus up the list on up arrow key press", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <DropdownMenu closeMenu={jest.fn} />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const firstItem = screen.getByText(/view profile/i);
    const thirdItem = screen.getByText(/log/i);

    // Set focus on bottom of menu to start
    thirdItem.focus();

    // Move up the menu
    userEvent.keyboard('{ArrowUp}');
    userEvent.keyboard('{ArrowUp}');
  
    expect(document.activeElement).toEqual(firstItem);
  });

  
  it("Up arrow moves to bottom of list when already at top of list to begin", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <DropdownMenu closeMenu={jest.fn} />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const firstItem = screen.getByText(/view profile/i);
    const thirdItem = screen.getByText(/log/i);

    // Set focus on bottom of menu to start
    thirdItem.focus();

    // Move up the menu
    userEvent.keyboard('{ArrowDown}');
  
    expect(document.activeElement).toEqual(firstItem);
  });

  
  it("Down arrow moves focus to top of list when starting at the bottom", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider value={{ showToast: jest.fn }}>
            <DropdownMenu closeMenu={jest.fn} />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
    
    const thirdItem = screen.getByText(/log/i);

    // Move up the menu
    userEvent.keyboard('{ArrowUp}');
  
    expect(document.activeElement).toEqual(thirdItem);
  });
}, [])