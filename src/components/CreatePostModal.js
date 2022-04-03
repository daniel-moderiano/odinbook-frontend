import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { useToastContext } from '../context/ToastContext';
import Button from './utils/Button';

const CreatePostModal = ({ closeModal, updateFeed }) => {
  const { createPost, response, loading, error } = useCreatePost();
  const { showToast } = useToastContext();

  const [postText, setPostText] = useState('');

  const handleSubmit = (e)  => {
    e.preventDefault();
    createPost(postText);
  };

  useEffect(() => {
    if (error) {
      showToast('error', 'An error occurred while creating the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  useEffect(() => {
    if (response) {
      showToast('success', 'Post successfully created.')
      updateFeed(Math.random());
      closeModal();
    }
  }, [response, updateFeed, showToast, closeModal])

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
              <h4 id="modal-title" className='text-xl font-semibold'>Create post</h4>
              <button type="button" aria-label="close current window" onClick={closeModal}>
                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

          </header>

          <div>
            <div className="w-full">
              <form className="py-4" onSubmit={handleSubmit}>
                <label htmlFor="post">Post text</label>
                <input type="text" id="post" onChange={(e) => setPostText(e.target.value)} value={postText} name="post"/>
                <Button type="submit" design="primary">
                  {loading ? 'Posting...' : 'Post'}
                </Button>
              </form>
            </div>

            <button className='bg-red-500 text-white font-semibold' onClick={handleSubmit}>
              {loading ? 'Updating...' : 'Delete'}
            </button>
            <button className='bg-gray-100 text-gray-800'>Cancel</button>
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default CreatePostModal;