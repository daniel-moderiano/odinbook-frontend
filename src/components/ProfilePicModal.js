import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import { useUpdateProfilePic } from '../hooks/useUpdateProfilePic'
import { useToastContext } from '../context/ToastContext';
import Button from './utils/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import ImageUploadBtn from './ImageUploadBtn';
import { useImageThumbnail } from '../hooks/useImageThumbnail';
import { useModalEvents } from '../hooks/useModalEvents';

const ProfilePicModal = ({ closeModal, profileUser, updateFeed }) => {
  const { updateProfilePic, loading, response, error } = useUpdateProfilePic();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();

  const { handleFile, removeThumbnail, imageData, imageError, imageLoading, setImageData } = useImageThumbnail();

  // Note: image value is in the context of an HTML file input value (e.target.value) and represents a pseudo string path to an image (e.g. 'C:/fakepath/image.png')
  const [imageValue, setImageValue] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Custom useEffect-style hook to control modal closing on esc and outside click
  useModalEvents(closeModal);

  // Image handling
  // If the user updates the current post image, this should be set to true. This includes replacing the image, or simply removing it. This will be appended to the req.body to inform the server to delete the old image
  const [imageUpdated, setImageUpdated] = useState(false);

  // Initialise imageData state to any existing image in the post
  useEffect(() => {
    if (profileUser.profilePic) {
      setImageData(profileUser.profilePic.imageUrl)
    }
  }, [profileUser.profilePic, setImageData])

  useEffect(() => {
    if (response) {
      updateFeed(Math.random())
      showToast('success', 'Post edited');
      closeModal();
    }
  }, [response, showToast, closeModal, updateFeed]);

  useEffect(() => {
    if (error) {
      console.log(error);
      showToast('error', 'An error occurred while editing the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('imageUpdated', imageUpdated);
    updateProfilePic(profileUser._id, formData);
  }

  return (
    <FocusTrap>
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md px-5 py-4 flex flex-col items-start rounded shadow-md'>

          <header className='flex flex-col justify-start items-start w-full border-b'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h4 id="modal-title" className='text-xl font-semibold'>Edit profile picture</h4>
              <button type="button" aria-label="close current window" onClick={closeModal}>
                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

          </header>

          <div className="w-full">
            {/* Image preview div */}
            <div id='preview' className='flex items-center justify-center w-full'>
              {imageLoading && (
                <div className='h-36'>
                  <div role="status" className="border-[6px] border-gray-200 w-10 h-10 border-t-plum-500 rounded-full w animate-[spinner_1.5s_infinite_linear]">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
     
              <div className={`relative px-2 py-4 border mt-4 border-gray-200 ${!imageData && 'border-dashed bg-gray-50'} rounded mb-4 w-full flex items-center- justify-center`}>
                {imageData ? (
                  <>
                    <img className='w-8/12 rounded-full' src={imageData} alt="" />
                    <button className='flex absolute top-2 right-2 p-1 rounded-full bg-gray-100 border-gray-300 border items-center justify-center hover:bg-gray-200' onClick={() => {
                      // Clear the file from the input and from the file state
                      setImageValue('');
                      setImageFile(null);
                      setImageUpdated(true);
                      removeThumbnail();
                    }}>
                      <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  <p>No picture added</p>
                )}
              </div>


            </div>
           

            <div className='flex items-center justify-between'>
              <ImageUploadBtn handleChange={(e) => {
                handleFile(e.target.files[0]);
                setImageUpdated(true);
              }} imageValue={imageValue} setImageValue={setImageValue} setImageFile={setImageFile}/>
              <Button design="primary" customStyles="max-w-[100px]" onClick={handleSubmit}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
      
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default ProfilePicModal;