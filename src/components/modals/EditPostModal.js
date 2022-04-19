import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import { useUpdatePost } from '../../hooks/useUpdatePost';
import { useToastContext } from '../../context/ToastContext';
import Button from '../utils/Button';
import ProfilePic from '../utils/ProfilePic';
import { useAuthContext } from '../../hooks/useAuthContext';
import ImageUploadBtn from '../buttons/ImageUploadBtn';
import { useImageThumbnail } from '../../hooks/useImageThumbnail';
import { useModalEvents } from '../../hooks/useModalEvents';
import { useErrorToast } from '../../hooks/useErrorToast';
import CloseIcon from '../icons/CloseIcon';
import EmojiPickerBtn from '../buttons/EmojiPickerBtn'

const EditPostModal = ({ closeModal, post, updatePosts }) => {
  const { updatePost, response, loading, error } = useUpdatePost();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading, setImageData } = useImageThumbnail();
  
  useModalEvents(closeModal);

  // Set up notifications
  useErrorToast(imageError, 'An error occurred while uploading the image.');

  // Note: image value is in the context of an HTML file input value (e.target.value) and represents a pseudo string path to an image (e.g. 'C:/fakepath/image.png')
  const [imageValue, setImageValue] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Set state initially to current post text. 
  const [postText, setPostText] = useState(post.text);

  // Image handling
  // If the user updates the current post image, this should be set to true. This includes replacing the image, or simply removing it. This will be appended to the req.body to inform the server to delete the old image
  const [imageUpdated, setImageUpdated] = useState(false);

  // Initialise imageData state to any existing image in the post
  useEffect(() => {
    if (post.image) {
      setImageData(post.image.imageUrl)
    }
  }, [post.image, setImageData])

  // 'Handle' a successful edit
  useEffect(() => {
    if (response) {
      updatePosts()
      showToast('success', 'Changes saved');
      closeModal();
    }
  }, [response, showToast, closeModal, updatePosts]);

  // Additional action of closing the modal is required here, which is why showToast is called manually to avoid multiple useEffect hooks watching the same variable
  useEffect(() => {
    if (error) {  
      showToast(error, 'An error occurred while saving your changes.');
      closeModal();
    }
  }, [error, closeModal, showToast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', postText);
    formData.append('image', imageFile);
    formData.append('imageUpdated', imageUpdated);
    updatePost(post._id, formData);
  };
  
  const onEmojiClick = (event, emojiObject) => {
    setPostText((prevState) => (prevState + emojiObject.emoji))
  };

  return (
    <FocusTrap>
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md px-5 py-4 flex flex-col items-start rounded shadow-md max-h-full overflow-y-auto'>

          <header className='flex flex-col justify-start items-start w-full border-b'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h3 id="modal-title" className='text-xl font-semibold'>Edit post</h3>
              <button type="button" className='rounded-full p-1 hover:bg-gray-100 active:scale-0.95 outline-plum-600' aria-label="close current window" onClick={closeModal}>
                <CloseIcon iconStyles="w-6" iconFill="#1B1E22"/>
              </button>
            </div>

          </header>

          <div className="w-full">
            <div className='flex items-center justify-start py-3'>
              <ProfilePic image={user.profilePic && user.profilePic} styles="w-10 h-10 mr-3 sm:mr-3 rounded-full"/>
              <p className="block font-semibold hover:underlinemax-w-[200px]">{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <label htmlFor="postText" className='sr-only'>Post text</label>
              <textarea  required autoFocus onFocus={(e) => {
                // Set the cursor at the end of the current post text
                e.target.setSelectionRange(postText.length, postText.length);
              }}
          className="w-full resize-none rounded py-2 text-sm sm:text-base outline-none" name="postText" id="postText" rows="4" onChange={(e) => setPostText(e.target.value)} value={postText} placeholder="What's on your mind?"></textarea>
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
                  <button className='flex absolute top-2 right-2 p-1 rounded-full bg-gray-100 border-gray-300 border items-center justify-center hover:bg-gray-200 active:scale-95 outline-plum-600' onClick={() => {
                    // Clear the file from the input and from the file state
                    setImageValue('');
                    setImageFile(null);
                    setImageUpdated(true);
                    removeThumbnail();
                  }}>
                    <CloseIcon iconStyles="w-5" iconFill="#1B1E22"/>
                  </button>
                </div>
              )}

            </div>
           

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <EmojiPickerBtn onEmojiClick={onEmojiClick}/>
                <ImageUploadBtn handleChange={(e) => {
                  handleFile(e.target.files[0]);
                  setImageUpdated(true);
                }} imageValue={imageValue} setImageValue={setImageValue} setImageFile={setImageFile}/>
              </div>

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