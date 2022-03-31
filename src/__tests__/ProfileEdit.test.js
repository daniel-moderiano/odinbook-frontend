import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import ProfileEdit from "../components/ProfileEdit";

// Matches the exact format of data received from backend 
const profileUser = {
  "profilePic": {
    "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
  },
  "_id": "622ffeb44dc1fd166b08b3ce",
  "firstName": "Chardee",
  "lastName": "McDennis",
  "email": "chardee.mcdennis@gmail.com",
  "createdAt": "2022-03-15T02:49:24.460Z",
  "updatedAt": "2022-03-15T11:19:10.042Z",
  "__v": 0,
  "fullName": "Chardee McDennis",
  "dateJoined": "March 15, 2022",
  "id": "622ffeb44dc1fd166b08b3ce",
  "bio": {
    "location": "Philadelphia",
    "occupation": "Bartender",
  },
}

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


it("Initialises input values with current profile information where available", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <ProfileEdit profileUser={profileUser}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const firstName = screen.getByLabelText(/first name/i);
  expect(firstName.value).toBe('Chardee');

  const lastName = screen.getByLabelText(/last name/i);
  expect(lastName.value).toBe('McDennis');

  const email = screen.getByLabelText(/email/i);
  expect(email.value).toBe('chardee.mcdennis@gmail.com');

  const location = screen.getByLabelText(/location/i);
  expect(location.value).toBe('Philadelphia');

  const occupation = screen.getByLabelText(/occupation/i);
  expect(occupation.value).toBe('Bartender');

  // Initialises to empty string when no bio info available
  const education = screen.getByLabelText(/education/i);
  expect(education.value).toBe('');
});