import { useState, useEffect } from 'react';
import { useErrorToast } from '../hooks/useErrorToast';
import { useEditComment } from '../hooks/useEditComment';
import EmojiPickerBtn from './buttons/EmojiPickerBtn';
import Button from './utils/Button';

const EditCommentForm = ({ postId, commentId, currentText, updateComments }) => {
  const { editComment, response, loading, error } = useEditComment()
  const [commentText, setCommentText] = useState(currentText);

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

  // Function required to ensure emojis are added to the comment text when one is selected
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
        className="w-full bg-gray-50 border rounded text-sm border-slate-300 py-2 px-3 pr-8 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400"
      />
      <div className='absolute right-0 top-1'>
        <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={false} />
      </div>
      {commentText.length > 0 && (
        <Button type="submit" design="primary-sm">
          {loading ? 'Saving...' : 'Save'}
        </Button>
      )}
    </form>
  )
}

export default EditCommentForm;