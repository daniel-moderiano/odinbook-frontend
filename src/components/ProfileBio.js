import BriefcaseIcon from "./icons/BriefcaseIcon";
import ClockIcon from "./icons/ClockIcon";
import GraduationCapIcon from "./icons/GraduationCapIcon";
import MapIcon from "./icons/MapIcon";

const ProfileBio = ({ profileUser }) => {

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <h2 className="font-bold text-2xl mb-3">About</h2>
      {profileUser.bio && (
        <>
          {profileUser.bio.occupation && (
            <div className="flex items-center justify-start mb-2">
              <BriefcaseIcon iconFill="#6A70A0CC" iconStyles="w-5 mr-3" />
              <p><strong className="font-semibold">{profileUser.bio.occupation}</strong></p>
            </div>
          )}
          {profileUser.bio.education && (
            <div className="flex items-center justify-start mb-2">
              <GraduationCapIcon iconFill="#6A70A0CC" iconStyles="w-5 mr-3" />
              <p>Studied at <strong className="font-semibold">{profileUser.bio.education}</strong></p>
            </div>
          )}
          {profileUser.bio.location && (
            <div className="flex items-center justify-start mb-2">
              <MapIcon iconFill="#6A70A0CC" iconStyles="w-5 mr-3" />
              <p>Lives in <strong className="font-semibold">{profileUser.bio.location}</strong></p>
            </div>
          )}
        </>
      )}

      {/* Rendered for all users regardless of additional bio info */}
      <div className="flex items-center justify-start mb-1">
        <ClockIcon iconFill="#6A70A0CC" iconStyles="w-5 mr-3" />
        <p>Member since {profileUser.dateJoined}</p>
      </div>
    </div>
  )
}

export default ProfileBio;