import anonPicLarge from '../../assets/anon-user-lg.png';

// Conditionally render a profile picture when an image URL is available, otherwise default to an anonymous user profile picture. All styling is provided through the styles prop
const ProfilePic = ({ imgUrl, styles }) => {
  return (
    <>
      {imgUrl ? (
        <img src={imgUrl} alt="Profile picture" className={`object-cover ${styles}`} />
      ) : (
        <img src={anonPicLarge} alt="Blank Profile picture" className={`object-cover ${styles}`}/>
      )}
    </>
  )
}

export default ProfilePic;