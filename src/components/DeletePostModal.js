import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDeletePost } from '../hooks/useDeletePost';
import { useToastContext } from '../context/ToastContext';

const DeletePostModal = ({ closeModal, postId }) => {
  const { deletePost, response, loading, error } = useDeletePost();
  const { showToast } = useToastContext();

  useEffect(() => {
    if (response) {
      closeModal();
      showToast('success', 'Post removed');
    }
  }, [response, showToast, closeModal]);

  useEffect(() => {
    if (error) {
      closeModal();
      showToast('error', 'An error occurred while removing the post.')
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

        <div className='bg-white w-full max-w-md p-5 flex flex-col items-start rounded shadow-md'>

          <header className='flex flex-col justify-start items-start w-full border-b pb-2'>

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

          <div>
            <p>Are you sure you want to remove this post?</p>

            <button className='bg-red-500 text-white font-semibold' onClick={() => deletePost(postId)}>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
            <button className='bg-gray-100 text-gray-800'>Cancel</button>
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default DeletePostModal;