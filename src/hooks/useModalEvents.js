import { useEffect } from "react"

  // Add user-expected actions when pressing the escape key or clicking outside the modal (close the modal). 
export const useModalEvents = (closeModal) => {
  useEffect(() => {
    const outsideClick = (event) => {
      // Assumed the modal is labelled with the ID 'Modal'
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

    // Clean up listeners on component dismount
    return () => {
      window.removeEventListener('click', outsideClick)
      window.removeEventListener('keydown', escClose)
    }
  }, [closeModal])
};

