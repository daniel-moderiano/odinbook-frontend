import { useEffect, useState } from "react"

// Use this hook for any modal/menu/dialog to apply common 'expected' UX features such as closing on outside click or escape key press. Takes ID of the element to apply these events too, and the function that closes/dismissed the element
export const useToggleElement = (elementId) => {
  const [showElement, setShowElement] = useState(null);

  const toggleElement = () => {
    setShowElement((prevState) => !prevState);
  };

  // Effect to apply event listeners
  useEffect(() => {
    // Ensure the element closes when the user clicks outside the element
    const handleOutsideClick = (event) => {
      if (event.target.dataset.id !== elementId) {
        setShowElement(false);
      }      
    };

    // Ensure the element closes when the user presses the Escape key
    const handleEscPress = (event) => {
      if (event.key === 'Escape') {
        setShowElement(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleEscPress);

    // Clean up event listeners on component dismount
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.addEventListener('keydown', handleEscPress);
    }
  }, [elementId]);

  // Return toggleElement function, but also make available setShowElement in case you need to perform a one-way open/close  
  return { showElement, setShowElement, toggleElement };
}

