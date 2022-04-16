import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import Nav from "../components/Nav";
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

describe('Dropdown menu display tests', () => {
  const setup = () => render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <Nav />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  it('Hides menu by default', () => {
    setup();
    const menu = screen.queryByTestId('dropdown');
    expect(menu).not.toBeInTheDocument();
  });

  it('Opens menu on click of profile pic btn if menu is currently closed', () => {
    setup();
    const btn = screen.getByTestId(/user-menu/i);
    userEvent.click(btn);

    const menu = screen.getByTestId('dropdown');
    expect(menu).toBeInTheDocument();
  });

  it('Closes menu on click of profile pic btn if menu is already open', () => {
    setup();
    // Open and close with double btn press
    const btn = screen.getByTestId(/user-menu/i);
    userEvent.click(btn);
    userEvent.click(btn);

    const menu = screen.queryByTestId('dropdown');
    expect(menu).not.toBeInTheDocument();
  });

  it('Closes menu when any of the menu btns are pressed', () => {
    setup();
    // Open menu
    const btn = screen.getByTestId(/user-menu/i);
    userEvent.click(btn);
    
    const menuBtn = screen.getByRole('button', { name: /log out/i });
    userEvent.click(menuBtn);
  
    const menu = screen.queryByTestId('dropdown');
    expect(menu).not.toBeInTheDocument();
  });
  
  it('Closes menu when outside click occurs', () => {
    setup();
    const nav = screen.getByRole('navigation');

    // Open menu
    const btn = screen.getByTestId(/user-menu/i);
    userEvent.click(btn);
    
    // Outside click by clicking on post body
    userEvent.click(nav);
  
    const menu = screen.queryByTestId('dropdown');
    expect(menu).not.toBeInTheDocument();
  });
  
  it('Closes menu when Esc key is pressed', () => {
    setup();
    // Open menu
    const btn = screen.getByTestId(/user-menu/i);
    userEvent.click(btn);
    
    userEvent.keyboard('{esc}')
  
    const menu = screen.queryByTestId('dropdown');
    expect(menu).not.toBeInTheDocument();
  });
  
  it('Does not close menu when menu is clicked in a non-btn area', () => {
    setup();
    // Open menu
    const btn = screen.getByTestId(/user-menu/i);
    userEvent.click(btn);
    
    const menu = screen.getByTestId('dropdown');
    userEvent.click(menu);
    expect(menu).toBeInTheDocument();
  });
});