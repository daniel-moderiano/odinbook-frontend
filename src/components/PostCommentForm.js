import ProfilePic from './utils/ProfilePic';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostComment } from '../hooks/usePostComment';
import { useErrorToast } from '../hooks/useErrorToast';
import EmojiPickerBtn from './buttons/EmojiPickerBtn';
import Button from './utils/Button';

// Used when posting a comment for the first time (i.e. not editing)
const PostCommentForm = ({ postId, updateComments }) => {
  const { user } = useAuthContext();
  const { postComment, response, loading, error } = usePostComment();
  const [commentText, setCommentText] = useState('');

  // Set up notifications.
  useErrorToast(error, 'An error occurred while posting the comment.');

  // Update UI changes to reflect a successful comment submission ('reset' form and thus hide post button)
  useEffect(() => {
    if (response) {
      setCommentText('');
      updateComments();
    }
  }, [response, updateComments])

  const handleSubmit = async (e) => {
    e.preventDefault();
    postComment(postId, commentText);
  };

  const onEmojiClick = (event, emojiObject) => {
    setCommentText((prevState) => (prevState + emojiObject.emoji))
  };

  return (
    <div className='flex items-start mx-4'>
      <ProfilePic image={user.profilePic && user.profilePic} styles="w-9 h-9 mr-2 mt-0 rounded-full"/>
      <form onSubmit={handleSubmit} className="w-full mr-2 flex flex-col items-start relative">
        <textarea 
          name="commentText"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="w-full border rounded text-sm border-slate-300 py-2 pl-3 pr-12 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400"
          placeholder="Add a comment"
        />
        <div className='absolute right-0 top-1'>
          <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={false}/>
        </div>
        {commentText.length > 0 && (
          <Button type="submit" design="primary-sm">
            {loading ? 'Posting...' : 'Post'}
          </Button>
        )}
      </form>
    </div>
  )
}

export default PostCommentForm;