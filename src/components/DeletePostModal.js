import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { useDeletePost } from '../hooks/useDeletePost';
import { useToastContext } from '../context/ToastContext';

const DeletePostModal = ({ closeModal, postId, updateFeed }) => {
  const { deletePost, response, loading, error } = useDeletePost();
  const { showToast } = useToastContext();

  useEffect(() => {
    if (response) {
      updateFeed(Math.random())
      showToast('success', 'Post removed');
      closeModal();
    }
  }, [response, showToast, closeModal, updateFeed]);

  useEffect(() => {
    if (error) {
      showToast('error', 'An error occurred while removing the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  // Add user-expected actions when pressing the escape key or clicking outside the modal (close the modal)
  useEffect(() => {
    const outsideClick = (event) => {
      if (event.target === document.querySelector('#Modal')) {
        closeModal();
      }
    }

    const escClose = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('click', outsideClick);
    window.addEventListener('keydown', escClose);

    return () => {
      window.removeEventListener('click', outsideClick)
      window.removeEventListener('keydown', escClose)
    }
  }, [closeModal])

  return (
    <FocusTrap>
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md px-5 py-4 flex flex-col items-start rounded shadow-md'>

          <header className='flex flex-col justify-start items-start w-full border-b'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h4 id="modal-title" className='text-xl font-semibold'>Delete post</h4>
              <button type="button" aria-label="close current window" onClick={closeModal}>
                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

          </header>

          <div className='w-full'>
            <p className='p-4 text-sm font-semibold text-red-700 bg-red-100 w-full my-4'>Once a post is deleted, it cannot be recovered.</p>
            <p className='mb-6 mt-6'>Delete this post?</p>
            <div className='flex items-center justify-end'>
              <button className='bg-gray-100 text-gray-800 max-w-[100px] w-full px-2 py-1 mr-2 hover:bg-gray-200 shadow-sm  focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-gray-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100' onClick={closeModal}>Cancel</button>
              <button className='bg-red-500 text-white max-w-[100px] w-full px-2 py-1 hover:bg-red-600 shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-red-300/70 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100' onClick={() => deletePost(postId)}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
            
            
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default DeletePostModal;