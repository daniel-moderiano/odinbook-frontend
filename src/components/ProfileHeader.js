import { useEffect } from "react";

const ProfileHeader = ({ profileUser, profileType }) => {
  useEffect(() => {
    console.log(profileType, profileUser);
  }, [profileType, profileUser])

  return (
    <div>
      <h2>Profile Header</h2>
      {profileUser ? (
        <p>{profileUser.fullName}</p>
      ) : (
        <p>User not loaded</p>
      )}
    </div>
    
  )
}

export default ProfileHeader;