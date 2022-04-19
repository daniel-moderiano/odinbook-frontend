import anonPicLarge from '../../assets/anon-user-lg.png';

// Conditionally render a profile picture when an image URL is available, otherwise default to an anonymous user profile picture. All styling is provided through the styles prop. Alt text is set to blank if none is provided (which should never be the case unless an error has occurred)
const ProfilePic = ({ image, styles }) => {
  return (
    <>
      {image ? (
        <img src={image.imageUrl} alt={image.altText ? image.altText : ''} className={`object-cover ${styles}`} />
      ) : (
        <img src={anonPicLarge} alt="Anonymous user avatar" className={`object-cover ${styles}`}/>
      )}
    </>
  )
}

export default ProfilePic;