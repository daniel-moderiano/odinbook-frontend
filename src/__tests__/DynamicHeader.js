import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import userEvent from "@testing-library/user-event";
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

  const header = screen.queryByRole('img');
  expect(header).toBeInTheDocument();
});