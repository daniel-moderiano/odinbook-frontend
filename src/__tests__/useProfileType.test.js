import { renderHook } from '@testing-library/react-hooks';
import { useProfileType } from '../hooks/useProfileType';

// Example users are provided in a format virtually identical to what will be used within the app. Current user represents the logged in user. Profile user represents the details of the user whose profile is being requests

const currentUserOne = {
  "_id": "622ffeb44dc1fd166b08b3ce",
  "firstName": "Chardee",
  "lastName": "McDennis",
};

const currentUserTwo = {
  "_id": "622ffe9baa78d2996267f831",
  "firstName": "Vivienne",
  "lastName": "Klein",
};

const currentUserThree = {
  "_id": "622ffe9baa78d2996267f999",
  "firstName": "Mr",
  "lastName": "Invisible",
};

// User details of the profile that is being requests
const profileUser = {
  user: {
    "bio": {
        "location": "San Leandro",
        "occupation": "Product Implementation Orchestrator",
        "education": "Australia",
        "gender": "Non-binary"
    },
    "profilePic": {
        "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
    },
    "_id": "622ffe9baa78d2996267f831",
    "firstName": "Vivienne",
    "lastName": "Klein",
    "email": "Otho.Kulas@hotmail.com",
    "friends": [
        {
            "user": "622ffeb44dc1fd166b08b3ce",
            "status": "friend",
            "_id": "6230762de5936743db38c347"
        },
        {
            "user": "622ffeb44dc1fd166b08b3cd",
            "status": "incomingRequest",
            "_id": "6230762de5936743db38c347"
        }
    ],
    "createdAt": "2022-03-15T02:49:00.055Z",
    "updatedAt": "2022-03-15T11:19:09.981Z",
    "__v": 0,
    "fullName": "Vivienne Klein",
    "dateJoined": "March 15, 2022",
    "id": "622ffe9baa78d2996267f831"
  }
}

it('correctly identifies a friend profile', () => {
  const { result } = renderHook(() => useProfileType(profileUser, currentUserOne));
  expect(result.current.profileType).toBe('friend');
});

it('correctly identifies a non-friend profile', () => {
  const { result } = renderHook(() => useProfileType(profileUser, currentUserThree));
  expect(result.current.profileType).toBe('nonFriend');
});

it("correctly identifies a user's own profile", () => {
  const { result } = renderHook(() => useProfileType(profileUser, currentUserTwo));
  expect(result.current.profileType).toBe('ownProfile');
});