import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { useDeletePost } from '../hooks/useDeletePost';
import { useToastContext } from '../context/ToastContext';
import { useModalEvents } from '../hooks/useModalEvents';
import CloseIcon from './icons/CloseIcon';
import Button from './utils/Button';

const DeletePostModal = ({ closeModal, postId, updatePosts }) => {
  const { deletePost, response, loading, error } = useDeletePost();
  const { showToast } = useToastContext();

  useModalEvents(closeModal);

  // Handle successful post deletion
  useEffect(() => {
    if (response) {
      updatePosts()
      showToast('success', 'Post removed');
      closeModal();
    }
  }, [response, showToast, closeModal, updatePosts]);

  // Handle post deletion error
  useEffect(() => {
    if (error) {
      showToast('error', 'An error occurred while removing the post.');
      closeModal();
    }
  }, [error, showToast, closeModal]);

  return (
    <FocusTrap>
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md px-5 py-4 flex flex-col items-start rounded shadow-md max-h-full overflow-auto'>

          <header className='flex flex-col justify-start items-start w-full border-b'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h4 id="modal-title" className='text-xl font-semibold'>Delete post</h4>
              <button type="button" className='rounded-full p-1 hover:bg-gray-100 active:scale-0.95 outline-plum-600' aria-label="close current window" onClick={closeModal}>
                <CloseIcon iconStyles="w-6" iconFill="#1B1E22"/>
              </button>
            </div>

          </header>

          <div className='w-full'>
            <p className='p-4 text-sm font-semibold text-red-700 bg-red-100 w-full my-4'>Once a post is deleted, it cannot be recovered.</p>
            <p className='mb-6 mt-6'>Delete this post?</p>
            <div className='flex items-center justify-end'>
              <button className='bg-gray-100 text-gray-800 max-w-[100px] w-full px-2 py-1 mr-2 hover:bg-gray-200 shadow-sm  focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-gray-400/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100' onClick={closeModal}>Cancel</button>
              <Button design="danger" customStyles="max-w-[100px]" onClick={() => deletePost(postId)}>
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
            
            
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default DeletePostModal;