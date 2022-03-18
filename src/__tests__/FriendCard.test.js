import { render, screen } from "@testing-library/react";
import FriendCard from '../components/FriendCard';

const friendData = {
  "user": {
      "profilePic": {
          "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
      },
      "_id": "622ffe9baa78d2996267f831",
      "firstName": "Vivienne",
      "lastName": "Klein",
      "fullName": "Vivienne Klein",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f831"
  },
  "status": "friend",
  "_id": "6230762de5936743db38c345"
}

const incomingRequest = {
  "user": {
      "profilePic": {
          "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
      },
      "_id": "622ffe9baa78d2996267f831",
      "firstName": "Vivienne",
      "lastName": "Klein",
      "fullName": "Vivienne Klein",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f831"
  },
  "status": "incomingRequest",
  "_id": "6230762de5936743db38c345"
}

const outgoingRequest = {
  "user": {
      "profilePic": {
          "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
      },
      "_id": "622ffe9baa78d2996267f831",
      "firstName": "Vivienne",
      "lastName": "Klein",
      "fullName": "Vivienne Klein",
      "dateJoined": "Invalid DateTime",
      "id": "622ffe9baa78d2996267f831"
  },
  "status": "outgoingRequest",
  "_id": "6230762de5936743db38c345"
}

const userData = {
  "user": {
    "profilePic": {
        "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
    },
    "_id": "622ffe9baa78d2996267f831",
    "firstName": "Vivienne",
    "lastName": "Klein",
    "fullName": "Vivienne Klein",
    "dateJoined": "Invalid DateTime",
    "id": "622ffe9baa78d2996267f831"
  },
}

describe("Friend card rendering (i.e. accepts that have been requests)", () => {
  beforeEach(() => {
    render(
      <FriendCard friendData={friendData.user} type="friend"/>
    );
  })

  it("Renders friend profile image", () => {
    const pic = screen.getByAltText(/^profile picture/i) 
    expect(pic).toBeInTheDocument();
  });

  it("Renders an unfriend button", () => {
    const unfriend = screen.getByRole('button', { name: /unfriend/i });
    expect(unfriend).toBeInTheDocument();
  });

  it("Does not render an accept, cancel or add button", () => {
    const btn = screen.queryByRole('button', { name: /(accept)|(add)|(cancel)/i }) 
    expect(btn).not.toBeInTheDocument();
  });
});

describe("Incoming friend request rendering", () => {
  beforeEach(() => {
    render(
      <FriendCard friendData={incomingRequest.user} type="incoming"/>
    );
  })

  it("Renders a delete button", () => {
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toBeInTheDocument();
  });

  it("Renders an accept button", () => {
    const acceptBtn = screen.getByRole('button', { name: /accept/i }) 
    expect(acceptBtn).toBeInTheDocument();
  });

  it("Does not render an add friend, unfriend or cancel button", () => {
    const btn = screen.queryByRole('button', { name: /(add)|(cancel)|(unfriend)/i }) 
    expect(btn).not.toBeInTheDocument();
  });
});


describe("Outgoing friend request rendering", () => {
  beforeEach(() => {
    render(
      <FriendCard friendData={outgoingRequest.user} type="outgoing" />
    );
  })

  it("Renders a cancel button", () => {
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    expect(cancelBtn).toBeInTheDocument();
  });

  it("Does not render an add, delete, unfriend, or accept button", () => {
    const btn = screen.queryByRole('button', { name: /(add)|(delete)|(accept)|(unfriend)/i }) 
    expect(btn).not.toBeInTheDocument();
  });
});


describe("General user (potential friends) rendering", () => {
  beforeEach(() => {
    render(
      <FriendCard friendData={outgoingRequest.user} type="user"/>
    );
  })

  it("Renders an 'add friend' button", () => {
    const addBtn = screen.getByRole('button', { name: /add/i });
    expect(addBtn).toBeInTheDocument();
  });

  it("Does not render an cancel, delete, unfriend, or accept button", () => {
    const btn = screen.queryByRole('button', { name: /(cancel)|(delete)|(accept)|(unfriend)/i }) 
    expect(btn).not.toBeInTheDocument();
  });
});
