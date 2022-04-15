import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import DynamicHeader from '../components/DynamicHeader';

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

it("Renders header by default", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <DynamicHeader />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const header = screen.queryByTestId('dynamic');
  expect(header).toHaveClass('top-0');
});

it("Hides header on scroll down", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <DynamicHeader />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Scroll down 200 pixels
  fireEvent.scroll(window, { target: { scrollY: 200 } });

  // Need minimum 300 ms timeout to allow transition to occur on DOM element
  const header = screen.queryByTestId('dynamic');
  expect(header).toHaveClass('top-[-50px]');
});

it("Shows header on scroll up", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <DynamicHeader />
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  // Scroll down 200 pixels
  fireEvent.scroll(window, { target: { scrollY: 200 } });
  fireEvent.scroll(window, { target: { scrollY: 0 } });

  const header = screen.queryByTestId('dynamic');
  expect(header).toHaveClass('top-0');
});
