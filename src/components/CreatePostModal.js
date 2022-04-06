import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { useToastContext } from '../context/ToastContext';
import Button from './utils/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import ProfilePic from './utils/ProfilePic';
import ImageUploadBtn from './ImageUploadBtn';

const CreatePostModal = ({ closeModal, updateFeed }) => {
  const { createPost, response, loading, error } = useCreatePost();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();

  const [postText, setPostText] = useState('');

  const [image, setImage] = useState(null);

  function handleFile(file) {
    const imgPreview = document.querySelector('#preview')
    const img = document.createElement("img");
    img.file = file;
    imgPreview.appendChild(img);

    // Create a new FileReader instance to convert the File object into a readable stream of data for UI display
    const reader = new FileReader();

    reader.onloadstart = (function () {
      return () => {
        console.log('Loading');
        document.querySelector('#imgLoading').textContent = 'Loading';
      }
    })();

    
    // Called once the reader instance completes the read. This pattern of an immediately called function is required for correct behaviour
    reader.onload = (function () {
      return (e) => {
        console.log('Loaded');
        document.querySelector('#imgLoading').textContent = '';
        // Result of file read can be accessed using e.target.result
        const imgRead = e.target.result;
        // Use image read as the new source of the img html element above
        img.src = imgRead;
      }
    })();

    reader.readAsDataURL(file);
  }

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

        <div className='bg-white w-full max-w-md px-5 py-4 flex flex-col items-start rounded shadow-md'>

          <header className='flex flex-col justify-start items-start w-full border-b'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h4 id="modal-title" className='text-xl font-semibold'>Create a post</h4>
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
              <textarea  required autoFocus
          className="w-full resize-none rounded py-2 text-sm sm:text-base outline-none" name="postText" id="postText" rows="5" onChange={(e) => setPostText(e.target.value)} value={postText} placeholder="What's on your mind?"></textarea>
            </form>

            {/* Image preview div */}
            <div id='preview'>
              <span id='imgLoading'></span>
            </div>

            <div className='flex items-center justify-between'>
              {/* FIles are accessed using the FileList property => element.files */}
              <ImageUploadBtn handleChange={(e) => handleFile(e.target.files[0])}/>
              
              <Button design="primary" customStyles="max-w-[100px]" disabled={!(postText.length > 0)} onClick={handleSubmit}>
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </div>
      
          </div>
        </div>
      </div>
    </FocusTrap>
  )
}

export default CreatePostModal;