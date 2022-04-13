import { useState, useEffect } from 'react';
import { useErrorToast } from '../hooks/useErrorToast';
import { useEditComment } from '../hooks/useEditComment';

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
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mr-2 flex flex-col items-start">
      <textarea 
        name="commentText"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
        className="w-full bg-gray-50 border rounded text-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400"
      />
      {commentText.length > 0 && (
        <button className='text-sm font-medium px-2 py-0.5 mt-3 ml-0.5 bg-plum-400 border border-plum-400 text-white shadow-md hover:bg-plum-300 hover:border-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'>
          {loading ? 'Saving...' : 'Save'}
        </button>
      )}
    </form>
  )
}

export default EditCommentForm;