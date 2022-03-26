import ProfilePic from './utils/ProfilePic';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostComment } from '../hooks/usePostComment';
import { useToastContext } from '../context/ToastContext';

const CommentForm = ({ imageUrl, postId, updateComments }) => {
  const { user: currentUser } = useAuthContext();
  const { postComment, response, loading, error } = usePostComment()
  const [commentText, setCommentText] = useState('');

  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  // Update UI changes to reflect a successful comment submission ('reset' form and thus hide post button)
  useEffect(() => {
    if (response) {
      setCommentText('');
      updateComments(Math.random());
    }
  }, [response, updateComments])

  const handleSubmit = async (e) => {
    e.preventDefault();
    postComment(postId, commentText);
  }

  return (
    <div className='flex items-start mx-4'>
      <ProfilePic imgUrl={imageUrl ? imageUrl : null} styles="w-9 mr-2 mt-0 rounded-full"/>
      <form onSubmit={handleSubmit} className="w-full mr-2 flex flex-col items-start">
        <textarea 
          name="commentText"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="w-full border rounded text-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400"
          placeholder="Add a comment"
        />
        {commentText.length > 0 && (
          <button className='text-sm font-medium px-2 py-0.5 mt-3 ml-0.5 bg-plum-400 border border-plum-400 text-white shadow-md hover:bg-plum-300 hover:border-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'>
            {loading ? 'Posting...' : 'Post'}
          </button>
        )}
      </form>
    </div>
  )
}

export default CommentForm