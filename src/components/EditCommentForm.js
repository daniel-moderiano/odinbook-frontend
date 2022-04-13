import { useState, useEffect } from 'react';
import { useErrorToast } from '../hooks/useErrorToast';
import { useEditComment } from '../hooks/useEditComment';
import Picker from 'emoji-picker-react';

const EditCommentForm = ({ postId, commentId, currentText, updateComments }) => {
  const { editComment, response, loading, error } = useEditComment()
  const [commentText, setCommentText] = useState(currentText);
  const [showPicker, setShowPicker] = useState(false);

  // Set up notifications
  useErrorToast(error, 'An error occurred while saving changes');

  // Update UI changes to reflect a successful comment submission ('reset' form and thus hide post button)
  useEffect(() => {
    if (response) {
      updateComments(Math.random());
    }
  }, [response, updateComments])

  const handleSubmit = async (e) => {
    e.preventDefault();
    editComment(postId, commentId, commentText);
  };

  const onEmojiClick = (event, emojiObject) => {
    setCommentText((prevState) => (prevState + emojiObject.emoji))
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full mr-2 flex flex-col items-start">
      <textarea 
        name="commentText"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
        className="w-full bg-gray-50 border rounded text-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400"
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
          {loading ? 'Saving...' : 'Save'}
        </button>
      )}
    </form>
  )
}

export default EditCommentForm;