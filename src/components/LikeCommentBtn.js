import { useAuthContext } from '../hooks/useAuthContext';
import Button from './utils/Button';
import { useLikeComment } from '../hooks/useLikeComment';
import { useToastContext } from '../context/ToastContext';
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
    const alreadyLiked = (comment.likes.some((id) => id === currentUser._id));

    return alreadyLiked;
  }

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = () => {
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
    <Button customStyles="text-xs text-gray-500 mr-4 font-medium hover:bg-gray-100 rounded-lg w-full disabled:hover:bg-transparent" disabled={disableButton()} onClick={() => {
      likeComment(postId, comment._id);
      setLocalLike(1);    // Ensures a local state change and re-render of likes. Reverted if error occurs
    }}>
      {setBtnText()}
    </Button>
  )
}

export default LikeCommentBtn;