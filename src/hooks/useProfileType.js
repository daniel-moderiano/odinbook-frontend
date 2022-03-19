// Custom hook to determine the relationship between two users - a user whose profile you are viewing, and the currently logged in user. Profile user will have all their data available, specifically their friends list, to help comparison.

import { useState, useEffect } from "react";

export const useProfileType = (profileUser, currentUser) => {
  // Default profileType to nonFriend to be on the safe side in case of unexpected errors in checking profile type
  const [profileType, setProfileType] = useState('nonFriend');

  const findRelationshipType = (profileUser, currentUser) => {
    // The simplest case where the current user views their own profile
    if (currentUser._id === profileUser._id) {
      return 'ownProfile';
    }

    // Check if the friends list of the user whose profile is being viewed contains the currently logged in user (i.e. the current user is friends with the owner of this profile being rendered)
    if (profileUser.friends.some((friend) => (friend.status === 'friend' && friend.user === currentUser._id))) {
      return 'friend'
    }

    // The default case should be nonFriend, as this is the safest option in case of unexpected error/results
    return 'nonFriend';
  }

  // Dynamically set the profileType once all user data is available
  useEffect(() => {
    // Do not attempt relationship determination unless all fetched data is available for comparison
    if (profileUser && currentUser) {
      // Set the profile type based on the relationship
      setProfileType(findRelationshipType(profileUser, currentUser));
    }
  }, [profileUser, currentUser]);

  // return profile type variable to be passed to components of the profile page
  return { profileType };
}
