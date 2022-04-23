import { useAuthContext } from '../../hooks/useAuthContext';
import { useLikeComment } from '../../hooks/useLikeComment';
import { useToastContext } from '../../context/ToastContext';
import { useEffect } from 'react';

const LikeCommentBtn = ({ postId, comment, setLocalLike }) => {
  const { user: currentUser } = useAuthContext();
  const { likeComment, response, loading, error } = useLikeComment();
  const { showToast } = useToastContext();

  // 'Listen' for an error in liking post and act accordingly
  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg);
      setLocalLike(0);
    }
  }, [error, showToast, setLocalLike]);

  // Check for the two cases where the user has liked a post, in which case the like button should be disabled
  const disableButton = () => {
    if (response) {   // user just successfully liked post
      return true;
    }

    // User already liked the post at an earlier time
    const alreadyLiked = (comment.likes.some((like) => like._id === currentUser._id));

    return alreadyLiked;
  }

  // Dynamically set button text to indicate loading taking place
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return 'Liking...';
    }

    if (error) {
      return 'Like';
    }

    if (response || disableButton()) {
      return 'Liked!'
    }

    // Default state should be returned
    return 'Like';
  }

  return (
    <button className="text-xs text-gray-500 mr-3 font-medium hover:bg-gray-100 rounded w-full disabled:hover:bg-transparent outline-plum-600 outline-offset-2" disabled={disableButton()} onClick={() => {
      likeComment(postId, comment._id);
      setLocalLike(1);    // Ensures a local state change and re-render of likes. Reverted if error occurs
    }}>
      {setBtnText()}
    </button>
  )
}

export default LikeCommentBtn;