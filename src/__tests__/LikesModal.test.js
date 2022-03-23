import { render, screen } from "@testing-library/react";
import LikesModal from '../components/LikesModal';

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
]

it("Renders all likes provided", () => {

});