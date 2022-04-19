import ProfilePic from './utils/ProfilePic';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostComment } from '../hooks/usePostComment';
import { useErrorToast } from '../hooks/useErrorToast';
import Picker from 'emoji-picker-react';

const CommentForm = ({ postId, updateComments }) => {
  const { user } = useAuthContext();
  const { postComment, response, loading, error } = usePostComment();
  const [commentText, setCommentText] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  // Set up notifications.
  useErrorToast(error, 'An error occurred while posting the comment.');

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
          className="w-full border rounded text-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400"
          placeholder="Add a comment"
        />
        <div className='opacity-70 absolute right-0 p-1 rounded-full hover:opacity-90 hover:cursor-pointer active:opacity-100' onClick={() => setShowPicker((prevState) => !prevState)}>
          🙂
          {showPicker && (
            <div className="relative">
              <Picker 
                onEmojiClick={onEmojiClick}
                native={true}
                disableSearchBar={true}
                groupVisibility={{
                  recently_used: false,
                }}
                pickerStyle={{ 
                  height: '300px', 
                  position: 'absolute',
                  right: '0'
                }}
              />
            </div>
          )}
        </div>
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