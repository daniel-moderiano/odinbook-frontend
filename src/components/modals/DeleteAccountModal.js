import { useEffect } from 'react';
import { useToastContext } from '../../context/ToastContext';
import Button from '../utils/Button';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';
import { useAuthContext } from '../../hooks/useAuthContext';
import ModalContainer from './ModalContainer';

const DeleteAccountModal = ({ closeModal }) => {
  const { user } = useAuthContext();
  const { deleteAccount, response, loading, error } = useDeleteAccount();
  const { showToast } = useToastContext();

  // Handle successful account deletion (deleteAccount function dispatched LOGOUT event, not needed here)
  useEffect(() => {
    if (response) {
      showToast('success', 'Account deleted successfully');
      closeModal();
    }
  }, [response, showToast, closeModal]);

  // Handle account deletion error
  useEffect(() => {
    if (error) {
      showToast('error', (error && error.errorMsg));
      closeModal();
    }
  }, [error, showToast, closeModal]);

  return (
    <ModalContainer modalId="DeleteAccountModal" title="Delete account" closeModal={closeModal}>
      <div className='w-full border-t'>
        <p className='p-4 text-sm font-semibold text-red-700 bg-red-100 w-full my-4'>Once your account is deleted, it cannot be recovered.</p>
        <p className='mb-6 mt-6'>Delete your account?</p>
        <div className='flex items-center justify-end'>
          <Button onClick={closeModal} design="secondary">Cancel</Button>
          <Button
            customStyles="max-w-[100px]"
            design="danger"
            hasPopup="dialog"
            onClick={() => deleteAccount(user._id)}
            disabled={user._id === '6253eafa7c5f03b0906cc7b5'}    // test account should not have delete access
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default DeleteAccountModal;