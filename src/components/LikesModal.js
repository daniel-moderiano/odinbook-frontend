import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';

const LikesModal = ({ postId, closeModal }) => {
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
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-100 left-0 top-0 h-full w-full overflow-auto bg-gray-600/50 justify-center items-center'>
        <div className='bg-white w-96 p-2 flex flex-col items-start rounded shadow-md'>
          <header className="modal-title">
            <h4 id="modal-title">Likes</h4>
            <button type="button" aria-label="close current window" onClick={closeModal}>
              <svg className="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </header>
          <div>  

          </div>
        </div>
      </div>
    </FocusTrap>


  )
}

export default LikesModal;