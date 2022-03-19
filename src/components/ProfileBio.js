
const ProfileBio = ({ profileUser, profileType }) => {
  return (
    <div className="shadow-sm w-full bg-white p-4">
      <h2 className="font-bold text-3xl mb-1">About</h2>
      {profileUser.bio.education && (
        <div>Studied at {profileUser.bio.education}</div>
      )}
      {profileUser.bio.location && (
        <div>Lives in {profileUser.bio.location}</div>
      )}
      {profileUser.bio.occupation && (
        <div>{profileUser.bio.occupation}</div>
      )}
    </div>
  )
}

export default ProfileBio;