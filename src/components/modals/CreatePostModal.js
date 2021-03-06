import { useEffect, useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost';
import { useToastContext } from '../../context/ToastContext';
import Button from '../utils/Button';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProfilePic from '../utils/ProfilePic';
import ImageUploadBtn from '../buttons/ImageUploadBtn';
import { useImageThumbnail } from '../../hooks/useImageThumbnail';
import { useErrorToast } from '../../hooks/useErrorToast';
import CloseIcon from '../icons/CloseIcon';
import EmojiPickerBtn from '../buttons/EmojiPickerBtn';
import ModalContainer from './ModalContainer';

const CreatePostModal = ({ closeModal, updatePosts }) => {
  const { createPost, response, loading, error } = useCreatePost();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading } = useImageThumbnail();

  // Set up notifications
  useErrorToast(imageError, 'An error occurred while uploading the image.');

  // Note: image value is in the context of an HTML file input value (e.target.value) and represents a pseudo string path to an image (e.g. 'C:/fakepath/image.png')
  const [imageValue, setImageValue] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [postText, setPostText] = useState('');

  // Convert to FormData object to allow backend processing with Express Multer middleware
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', postText);
    formData.append('image', imageFile);
    createPost(formData);
  };

  const onEmojiClick = (event, emojiObject) => {
    setPostText((prevState) => (prevState + emojiObject.emoji))
  };

  // Manual error toast is used as there are additional actions to perform when an error occurs here
  useEffect(() => {
    if (error) {
      showToast('error', 'An error occurred while creating the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  useEffect(() => {
    if (response) {
      updatePosts();
      closeModal();
    }
  }, [response, updatePosts, showToast, closeModal])

  return (
    <ModalContainer modalId="CreatePostModal" title="Create a post" closeModal={closeModal}>
      <div className="w-full border-t">

        <div className='flex items-center justify-start py-3'>
          <ProfilePic image={user.profilePic && user.profilePic} styles="w-10 h-10 mr-3 sm:mr-3 rounded-full" />
          <p className="block font-semibold hover:underlinemax-w-[200px]">{`${user.firstName} ${user.lastName}`}</p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <label htmlFor="postText" className='sr-only'>Post text</label>
          <textarea required autoFocus className="w-full resize-none rounded py-2 text-sm sm:text-base outline-none" name="postText" id="postText" rows="4" onChange={(e) => setPostText(e.target.value)} value={postText} placeholder="What's on your mind?"></textarea>
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
              <button className='flex absolute top-2 right-2 p-1 rounded-full bg-gray-100 border-gray-300 border items-center justify-center hover:bg-gray-200 active:scale-95' onClick={() => {
                // Clear the file from the input and from the file state
                setImageValue('');
                setImageFile(null);
                removeThumbnail();
              }}>
                <CloseIcon iconStyles="w-6" iconFill="#1B1E22" />
              </button>
            </div>
          )}
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={true} />
            <ImageUploadBtn handleChange={(e) => handleFile(e.target.files[0])} imageValue={imageValue} setImageValue={setImageValue} setImageFile={setImageFile} />
          </div>
          <Button
            design="primary"
            customStyles="max-w-[100px]"
            disabled={postText.length === 0 && !imageFile}
            onClick={handleSubmit}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default CreatePostModal;