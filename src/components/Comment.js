import ProfilePic from "./utils/ProfilePic";

const Comment = ({ postId, commentData }) => {
  return (
    <article>
      <ProfilePic imgUrl={commentData.user.profilePic ? commentData.user.profilePic.imageUrl : null} styles="w-10 mr-4 rounded-full"/>
      <div>
        <div>
          <div>
            <h3>{commentData.user.fullName}</h3>
            <p>{commentData.dateAdded}</p>
          </div>
          <p>{commentData.text}</p>
        </div>
        <div>
          <button>Like</button>
          <button>{commentData.numLikes}</button>
        </div>
      </div>
    </article>
  )
}

export default Comment