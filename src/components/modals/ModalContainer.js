import FocusTrap from 'focus-trap-react';
import CloseIcon from '../icons/CloseIcon'
import Button from '../utils/Button';
import { useModalCloseEvents } from '../../hooks/useModalCloseEvents';

// Contains the base modal HTML elements that are shared across every modal. The main content is passed as a child prop.
const ModalContainer = ({ closeModal, title, modalId, children }) => {
  useModalCloseEvents(modalId, closeModal);

  return (
    <FocusTrap>
      <div id={modalId} aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>
        <div className='bg-white w-full max-w-md p-5 flex flex-col items-start rounded shadow-md max-h-full overflow-auto'>
          <header className='flex flex-col justify-start items-start w-full pb-1.5'>
            <div className='flex justify-between items-center w-full pb-4'>
              <h3 id="modal-title" className='text-xl font-semibold'>{title}</h3>
              <Button design="modal-close" ariaLabel="close current window" onClick={closeModal}>
                <CloseIcon iconStyles="w-6" iconFill="#1B1E22"/>
              </Button>
            </div>
          </header>
          {children}
        </div>
      </div>
    </FocusTrap>
  )
}

export default ModalContainer;