import ProfilePic from './utils/ProfilePic';
import Input from './utils/Input';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostComment } from '../hooks/usePostComment';

const CommentForm = ({ imageUrl, postId }) => {
  const { user: currentUser } = useAuthContext();
  const { postComment, response, loading, error } = usePostComment()
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(postId, commentText);
  }

  return (
    <div>
      <ProfilePic imgUrl={imageUrl ? imageUrl : null} styles="w-8 mr-2 mt-1 rounded-full"/>
      <form onSubmit={handleSubmit}>
        <Input 
          name="commentText" 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required={true}
        />
        {commentText.length > 0 && (
          <button>Post</button>
        )}
      </form>
    </div>
  )
}

export default CommentForm