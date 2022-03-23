import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import LikesModal from "../components/LikesModal";

// Matches the exact format received from backend API
const likes = [
  {
      "_id": "622ffe9baa78d2996267f821",
      "firstName": "Kendrick",
      "lastName": "Purdy",
      "fullName": "Kendrick Purdy",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f821"
  },
  {
      "_id": "622ffe9baa78d2996267f81f",
      "firstName": "Wilton",
      "lastName": "Jacobs",
      "fullName": "Wilton Jacobs",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f81f"
  },
  {
      "_id": "622ffe9baa78d2996267f820",
      "firstName": "Jacey",
      "lastName": "Kunze",
      "fullName": "Jacey Kunze",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f820"
  }
];

jest.mock("../hooks/useFetchGet", () => ({
  useFetchGet: () => ({ 
    data: likes,
    loading: null,
    error: null
  }),
}));

it("Renders all likes provided", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <LikesModal closeModal={jest.fn} postId='testId'/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const likes = screen.getAllByRole('listitem');
  const likesCount = screen.getByText('3 likes')
  expect(likes.length).toBe(3);
  expect(likesCount).toBeInTheDocument();
});