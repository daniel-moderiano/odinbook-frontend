import { useEffect } from 'react';
import { useDeletePost } from '../../hooks/useDeletePost';
import { useToastContext } from '../../context/ToastContext';
import Button from '../utils/Button';
import ModalContainer from './ModalContainer';

const DeletePostModal = ({ closeModal, postId, updatePosts }) => {
  const { deletePost, response, loading, error } = useDeletePost();
  const { showToast } = useToastContext();

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
    <ModalContainer modalId="DeletePostModal" title="Delete post" closeModal={closeModal}>
      <div className='w-full border-t'>
        <p className='p-4 text-sm font-semibold text-red-700 bg-red-100 w-full my-4'>Once a post is deleted, it cannot be recovered.</p>
        <p className='mb-6 mt-6'>Delete this post?</p>
        <div className='flex items-center justify-end'>
          <Button design="secondary" onClick={closeModal}>Cancel</Button>
          <Button design="danger" customStyles="max-w-[100px]" onClick={() => deletePost(postId)}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default DeletePostModal;