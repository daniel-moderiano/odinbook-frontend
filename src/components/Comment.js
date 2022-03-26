import ProfilePic from "./utils/ProfilePic";
import LikeCommentBtn from './LikeCommentBtn';
import like from '../assets/like.png';
import { useEffect, useState } from "react";
import LikesModal from "./LikesModal";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useToastContext } from "../context/ToastContext";
import EditCommentForm from "./EditCommentForm";

const Comment = ({ postId, commentData, updateKey }) => {
  const { deleteComment, response, loading, error } = useDeleteComment();
  const { showToast } = useToastContext();

  const [showModal, setShowModal] = useState(false);

  // A system for making a local change to the number of likes. This is indepndent of the db, and will be reverted in the case of an error with liking comment on the backend
  const [localLike, setLocalLike] = useState(0);

  // Controls the comment mode from edit mode to normal 'read' mode
  const [editMode, setEditMode] = useState(false);

  // Update key to cause comments refresh on successful delete
  useEffect(() => {
    if (response) {
      updateKey(Math.random());
    }
  }, [response, updateKey]);

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  return (
    <>
      <article className="flex items-start justify-start mb-4 pr-2">
        <ProfilePic imgUrl={commentData.user.profilePic ? commentData.user.profilePic.imageUrl : null} styles="w-8 mr-2 mt-1 rounded-full"/>
        <div className={`flex flex-col items-start justify-center ${editMode && 'w-full'}`}>
          <div className={`bg-zinc-200/50 rounded p-2.5 md:p-3 ${editMode && 'w-full'}`}>
            <div className="flex w-full items-center justify-between mb-1">
              <h3 className="font-semibold text-sm mr-10">{commentData.user.fullName}</h3>
              <p className="text-xs text-gray-500">{commentData.dateAdded}</p>
            </div>
            {editMode ? (
              <EditCommentForm currentText={commentData.text} commentId={commentData._id} postId={postId} updateComments={updateKey}/>
            ) : (
              <p className="text-sm w-full">{commentData.text}</p>
            )}        
          </div>
          <div className="flex items-center justify-between py-1 pl-0.5 w-full">
            <div className="flex">
              <LikeCommentBtn postId={postId} comment={commentData} setLocalLike={setLocalLike}/>
              <button className="text-xs text-gray-500 flex items-center justify-center hover:underline hover:decoration-gray-600" onClick={() => setShowModal(true)}>
                <img src={like} alt="Love heart" className='w-3 mr-1 mb-px' />
                <span className='mt-px'>{commentData.numLikes + localLike}</span>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button className="text-xs text-gray-500 mr-3 font-medium hover:text-gray-700  disabled:hover:bg-transparent" onClick={() => setEditMode(true)}>Edit</button>
              <button className="text-xs text-gray-500 font-medium hover:text-red-700 disabled:hover:bg-transparent" onClick={() => deleteComment(postId, commentData._id)}>Delete</button>
            </div>
          </div>
        </div>
      </article>

      {showModal && (<LikesModal postId={postId} commentId={commentData._id} closeModal={() => setShowModal(false)}/>)}
    </>
  )
}

export default Comment