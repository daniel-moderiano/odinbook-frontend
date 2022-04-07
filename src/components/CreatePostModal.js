import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { useToastContext } from '../context/ToastContext';
import Button from './utils/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import ProfilePic from './utils/ProfilePic';
import ImageUploadBtn from './ImageUploadBtn';
import { useModalEvents } from '../hooks/useModalEvents';
import { useImageThumbnail } from '../hooks/useImageThumbnail';

const CreatePostModal = ({ closeModal, updateFeed }) => {
  const { createPost, response, loading, error } = useCreatePost();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading } = useImageThumbnail();

  // Note: image value is in the context of an HTML file input value (e.target.value) and represents a pseudo string path to an image (e.g. 'C:/fakepath/image.png')
  const [imageValue, setImageValue] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const [postText, setPostText] = useState('');
  
  // Custom useEffect-style hook to control modal closing on esc and outside click
  useModalEvents(closeModal);

  // Convert to FormData object to allow backend processing with Express Multer middleware
  const handleSubmit = (e)  => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', postText);
    formData.append('image', imageFile);
    createPost(formData);
  };

  useEffect(() => {
    if (error) {
      showToast('error', 'An error occurred while creating the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  
  useEffect(() => {
    if (imageError) {
      showToast('error', 'An error occurred while uploading the image.');
    }
  }, [imageError, showToast]);

  useEffect(() => {
    if (response) {
      showToast('success', 'Post successfully created.')
      updateFeed(Math.random());
      closeModal();
    }
  }, [response, updateFeed, showToast, closeModal])

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
            <div id='preview' className='flex items-center justify-center w-full'>
              {imageLoading && (
                <div className='h-36'>
                  <div role="status" className="border-[6px] border-gray-200 w-10 h-10 border-t-plum-500 rounded-full w animate-[spinner_1.5s_infinite_linear]">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {imageData && (
                <div className='relative p-2 border border-gray-200 rounded mb-4 w-full'>
                  <img className='w-full' src={imageData} alt="" />
                  <button className='flex absolute top-2 right-2 p-1 rounded-full bg-gray-100 border-gray-300 border items-center justify-center hover:bg-gray-200' onClick={() => {
                    // Clear the file from the input and from the file state
                    setImageValue('');
                    setImageFile(null);
                    removeThumbnail();
                  }}>
                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              )}

            </div>

            <div className='flex items-center justify-between'>
              <ImageUploadBtn handleChange={(e) => handleFile(e.target.files[0])} imageValue={imageValue} setImageValue={setImageValue} setImageFile={setImageFile}/>
              
              <Button 
                design="primary" 
                customStyles="max-w-[100px]" 
                disabled={postText.length === 0 && !imageFile} 
                onClick={handleSubmit}>
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