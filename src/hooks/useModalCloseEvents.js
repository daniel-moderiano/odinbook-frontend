import { useEffect } from "react"

// Use this hook for any modals common 'expected' UX features such as closing on outside click or escape key press. Takes ID of the element to apply these events too, and the function that closes/dismissed the element
export const useModalCloseEvents = (elementId, closeElement) => {
  // Effect to apply event listeners once on initial component mount
  useEffect(() => {
    // Ensure the element closes when the user clicks on the opaque modal 'background'
    const handleOutsideClick = (event) => {
      if (event.target.dataset.id === elementId) {
        closeElement(false);
      }      
    };

    // Ensure the element closes when the user presses the Escape key
    const handleEscPress = (event) => {
      if (event.key === 'Escape') {
        closeElement(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleEscPress);

    // Clean up event listeners on component dismount
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.addEventListener('keydown', handleEscPress);
    }
  }, [closeElement, elementId])
}

