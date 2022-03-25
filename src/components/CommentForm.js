import ProfilePic from './utils/ProfilePic';
import Input from './utils/Input';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const CommentInput = ({ imageUrl, postId }) => {
  const { user: currentUser } = useAuthContext();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <ProfilePic imgUrl={imageUrl ? imageUrl : null} styles="w-8 mr-2 mt-1 rounded-full"/>
      <form>
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

export default CommentInput