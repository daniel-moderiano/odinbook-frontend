import ProfilePic from "./utils/ProfilePic";
import LikeCommentBtn from './buttons/LikeCommentBtn';
import like from '../assets/like.png';
import { useEffect, useState } from "react";
import LikesModal from "./modals/LikesModal";
import { useDeleteComment } from "../hooks/useDeleteComment";
import EditCommentForm from "./EditCommentForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useErrorToast } from '../hooks/useErrorToast';
import { Link } from "react-router-dom";

const Comment = ({ postId, commentData, updateComments }) => {
  const { deleteComment, response, loading, error } = useDeleteComment();
  const { user } = useAuthContext();

  // Set up notifications.
  useErrorToast(error, 'An error occurred while deleting the comment.');

  const [showModal, setShowModal] = useState(false);

  // A system for making a local change to the number of likes. This is indepndent of the db, and will be reverted in the case of an error with liking comment on the backend
  const [localLike, setLocalLike] = useState(0);

  // Controls the comment mode from edit mode to normal 'read' mode
  const [editMode, setEditMode] = useState(false);

  // Update key to cause comments refresh on successful delete
  useEffect(() => {
    if (response) {
      updateComments();
    }
  }, [response, updateComments]);

  return (
    <>
      <article className="flex items-start justify-start mb-4 pr-2">

        <Link to={`/profile/${commentData.user._id}`} className="hover:opacity-95 active:opacity-100 mr-2 mt-1 outline-plum-600 shrink-0">
          <ProfilePic image={commentData.user.profilePic && commentData.user.profilePic} styles="w-9 h-9 mt-1 rounded-full"/>
        </Link>

        <div className={`flex flex-col items-start justify-center ${editMode && 'w-full'} max-w-full overflow-hidden`}>
          <div className={`bg-zinc-200/50 rounded p-2.5 md:p-3 ${editMode && 'w-full'} max-w-full`}>
            <div className="flex w-full items-center justify-between mb-1">
              <Link to={`/profile/${commentData.user._id}`} className="font-semibold text-sm mr-4 hover:underline">{commentData.user.fullName}</Link>
              <p className="text-xs text-gray-500">{commentData.dateAdded}</p>
            </div>
            {editMode ? (   // replace comment text with form for editing comments when editMode is set to true
              <EditCommentForm currentText={commentData.text} commentId={commentData._id} postId={postId} updateComments={updateComments}/>
            ) : (
              <h3 className=" text-sm break-words w-full">{commentData.text}</h3>
            )}        
          </div>

          <footer className="flex items-center justify-between py-1 pl-0.5 w-full">
            <div className="flex">
              <LikeCommentBtn postId={postId} comment={commentData} setLocalLike={setLocalLike}/>
              <button className="text-xs text-gray-500 flex items-center justify-center hover:underline hover:decoration-gray-600 outline-plum-600 outline-offset-2 w-full" onClick={() => setShowModal(true)}>
                <img src={like} alt="Love heart" className='w-3 mr-1 mb-px' />
                <span>{commentData.numLikes + localLike}</span>
              </button>
            </div>
            {commentData.user._id === user._id && (   // only show edit and delete buttons for user's own comments
              <div className="flex items-center justify-center">
                <button className="text-xs text-gray-500 mr-3 font-medium hover:text-gray-700  disabled:hover:bg-transparent outline-plum-600 outline-offset-2" onClick={() => setEditMode(true)}>Edit</button>
                <button className="text-xs text-gray-500 font-medium hover:text-red-700 disabled:hover:bg-transparent outline-plum-600 outline-offset-2" onClick={() => deleteComment(postId, commentData._id)}>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </footer>
        </div>
      </article>

      {showModal && (<LikesModal postId={postId} commentId={commentData._id} closeModal={() => setShowModal(false)}/>)}
    </>
  )
}

export default Comment