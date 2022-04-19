import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import EditPostModal from "../components/modals/EditPostModal";

const currentUser = {
  "_id": "622ffe9baa78d2996267f821",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

const post = {
  "_id": "6249726ac7868be43ca05a49",
  "user": {
      "_id": "622ffeb44dc1fd166b08b3ce",
      "firstName": "Chardee",
      "lastName": "McDennis",
      "fullName": "Chardee McDennis",
      "dateJoined": "Invalid DateTime",
      "id": "622ffeb44dc1fd166b08b3ce"
  },
  "text": "Test post",
  "likes": [],
  "comments": [],
  "createdAt": "2022-04-03T10:09:46.696Z",
  "updatedAt": "2022-04-03T11:46:15.020Z",
  "__v": 0,
  "numLikes": 0,
  "numComments": 0,
  "datePosted": "April 3, 2022",
  "id": "6249726ac7868be43ca05a49"
}

const postNoText = {
  "_id": "6249726ac7868be43ca05a49",
  "user": {
      "_id": "622ffeb44dc1fd166b08b3ce",
      "firstName": "Chardee",
      "lastName": "McDennis",
      "fullName": "Chardee McDennis",
      "dateJoined": "Invalid DateTime",
      "id": "622ffeb44dc1fd166b08b3ce"
  },
  "text": "",
  "likes": [],
  "comments": [],
  "createdAt": "2022-04-03T10:09:46.696Z",
  "updatedAt": "2022-04-03T11:46:15.020Z",
  "__v": 0,
  "numLikes": 0,
  "numComments": 0,
  "datePosted": "April 3, 2022",
  "id": "6249726ac7868be43ca05a49"
}

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ 
    user: currentUser
  }),
}));

it("Sets post text as initial textarea value when opening modal", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <EditPostModal closeModal={jest.fn} updateFeed={jest.fn} post={post}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const textarea = screen.getByRole('textbox');
  expect(textarea.value).toBe('Test post');
});

it("Enables post button by default", () => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <EditPostModal closeModal={jest.fn} updateFeed={jest.fn} post={post}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const postBtn = screen.getByRole('button', { name: /save/i });
  expect(postBtn).not.toHaveAttribute('disabled');
});

it("Disables post button if all text is removed", () => {
  // Pass in post prop with no text
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContextProvider value={{ showToast: jest.fn }}>
          <EditPostModal closeModal={jest.fn} updateFeed={jest.fn} post={postNoText}/>
        </ToastContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );

  const postBtn = screen.getByRole('button', { name: /save/i });
  expect(postBtn).toHaveAttribute('disabled');
});

