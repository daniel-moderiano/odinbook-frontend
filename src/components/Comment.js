import ProfilePic from "./utils/ProfilePic";
import LikeCommentBtn from './LikeCommentBtn';
import like from '../assets/like.png';
import { useState } from "react";
import LikesModal from "./LikesModal";

const Comment = ({ postId, commentData }) => {
  const [showModal, setShowModal] = useState(false);

  // A system for making a local change to the number of likes. This is indepndent of the db, and will be reverted in the case of an error with liking comment on the backend
  const [localLike, setLocalLike] = useState(0);

  return (
    <>
    <article className="flex w-full items-start justify-start mb-4">
      <ProfilePic imgUrl={commentData.user.profilePic ? commentData.user.profilePic.imageUrl : null} styles="w-8 mr-2 mt-1 rounded-full"/>
      <div className="flex flex-col items-start justify-center w-full">
        <div className="bg-zinc-200/50 rounded p-2 w-full">
          <div className="flex w-full items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">{commentData.user.fullName}</h3>
            <p className="text-xs text-gray-500">{commentData.dateAdded}</p>
          </div>
          <p className="text-sm w-full">{commentData.text}</p>
        </div>
        <div className="flex py-1 pl-0.5">
          <LikeCommentBtn postId={postId} comment={commentData} setLocalLike={setLocalLike}/>
          <button className="text-xs text-gray-500 flex items-center justify-center hover:underline hover:decoration-gray-600" onClick={() => setShowModal(true)}>
            <img src={like} alt="Love heart" className='w-3 mr-1 mb-px' />
            <span className='mt-px'>{commentData.numLikes + localLike}</span>
          </button>
        </div>
      </div>
    </article>

    {showModal && (<LikesModal postId={postId} commentId={commentData._id} closeModal={() => setShowModal(false)}/>)}
    </>
  )
}

export default Comment