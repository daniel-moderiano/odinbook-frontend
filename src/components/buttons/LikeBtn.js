import { useAuthContext } from '../../hooks/useAuthContext';
import { useLikePost } from '../../hooks/useLikePost';
import { useToastContext } from '../../context/ToastContext';
import { useEffect } from 'react';
import ThumbIcon from '../icons/ThumbIcon';

const LikeBtn = ({ post, setLocalLike }) => {
  const { user: currentUser } = useAuthContext();
  const { likePost, response, loading, error } = useLikePost();
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
    const alreadyLiked = (post.likes.some((id) => id === currentUser._id));

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
    <button className="flex items-middle justify-center text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-full disabled:hover:bg-transparent outline-plum-600" disabled={disableButton()} onClick={() => {
      likePost(post._id);
      setLocalLike(1);    // Ensures a local state change and re-render of likes. Reverted if error occurs
    }}>
      <ThumbIcon iconFill='#6b7280' iconStyles='w-5 mr-2'/>
      {setBtnText()}
    </button>
  )
}

export default LikeBtn;