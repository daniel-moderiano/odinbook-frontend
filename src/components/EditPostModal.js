import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { useToastContext } from '../context/ToastContext';
import Button from './utils/Button';
import ProfilePic from './utils/ProfilePic';
import { useAuthContext } from '../hooks/useAuthContext';

const EditPostModal = ({ closeModal, post, updateFeed }) => {
  const { updatePost, response, loading, error } = useUpdatePost();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();

  // Set state initially to current post text. 
  const [postText, setPostText] = useState(post.text);

  useEffect(() => {
    if (response) {
      updateFeed(Math.random())
      showToast('success', 'Post edited');
      closeModal();
    }
  }, [response, showToast, closeModal, updateFeed]);

  useEffect(() => {
    if (error) {
      showToast('error', 'An error occurred while editing the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(post._id, postText);
  }

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
              <h4 id="modal-title" className='text-xl font-semibold'>Edit post</h4>
              <button type="button" aria-label="close current window" onClick={closeModal}>
                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

          </header>

          <div className="w-full">
            <div className='flex items-center justify-start py-3'>
              <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="w-10 mr-3 sm:mr-3 rounded-full"/>
              <p className="block font-semibold hover:underlinemax-w-[200px]">{user.fullName}</p>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <label htmlFor="postText" className='sr-only'>Post text</label>
              <textarea  required autoFocus onFocus={(e) => {
                // Set the cursor at the end of the current post text
                e.target.setSelectionRange(postText.length, postText.length);
              }}
          className="w-full resize-none rounded py-2 text-sm sm:text-base outline-none" name="postText" id="postText" rows="5" onChange={(e) => setPostText(e.target.value)} value={postText} placeholder="What's on your mind?"></textarea>
            </form>

            <div className='flex items-center justify-between'>
              {/* Image upload btn and feature here */}
              <button className='p-1 rounded'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6'><path fill='#50547C' d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z"/></svg>
              </button>
              <Button design="primary" customStyles="max-w-[100px]" disabled={!(postText.length > 0)} onClick={handleSubmit}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
      
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default EditPostModal;