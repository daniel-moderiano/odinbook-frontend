import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { useToastContext } from '../../context/ToastContext';
import CloseIcon from '../icons/CloseIcon';
import Button from '../utils/Button';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useModalCloseEvents } from '../../hooks/useModalCloseEvents';

const DeleteAccountModal = ({ closeModal }) => {
  const { user } = useAuthContext();
  const { deleteAccount, response, loading, error } = useDeleteAccount();
  const { showToast } = useToastContext();

  useModalCloseEvents('DeleteAccountModal', closeModal);

  // Handle successful post deletion
  useEffect(() => {
    if (response) {
      showToast('success', 'Account deleted successfully');
      closeModal();
    }
  }, [response, showToast, closeModal]);

  // Handle post deletion error
  useEffect(() => {
    if (error) {
      showToast('error', (error && error.errorMsg));
      closeModal();
    }
  }, [error, showToast, closeModal]);

  return (
    <FocusTrap>
      <div id='DeleteAccountModal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md px-5 py-4 flex flex-col items-start rounded shadow-md max-h-full overflow-auto'>
          <header className='flex flex-col justify-start items-start w-full border-b'>
            <div className='flex justify-between items-center w-full pb-4'>
              <h3 id="modal-title" className='text-xl font-semibold'>Delete account</h3>
              <button type="button" className='rounded-full p-1 hover:bg-gray-100 active:scale-0.95 outline-plum-600' aria-label="close current window" onClick={closeModal}>
                <CloseIcon iconStyles="w-6" iconFill="#1B1E22"/>
              </button>
            </div>

          </header>

          <div className='w-full'>
            <p className='p-4 text-sm font-semibold text-red-700 bg-red-100 w-full my-4'>Once your account is deleted, it cannot be recovered.</p>
            <p className='mb-6 mt-6'>Delete your account?</p>
            <div className='flex items-center justify-end'>
              <button className='bg-gray-100 text-gray-800 max-w-[100px] w-full px-2 py-1 mr-2 hover:bg-gray-200 shadow-sm  focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-gray-400/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100' onClick={closeModal}>Cancel</button>
              <Button customStyles="max-w-[100px]" design="danger" hasPopup="dialog" onClick={() => deleteAccount(user._id)} disabled={user._id === '6253eafa7c5f03b0906cc7b5'}>
                {loading ? (
                  'Deleting...'
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
            
            
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default DeleteAccountModal;