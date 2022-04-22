import { useState, useEffect } from "react"

export const useDropdownMenu = () => {
  const [showMenu, setShowMenu] = useState(null);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    // Ensure the dropdown menu closes on outside click with a global window event listener
    const menuOutsideClick = (event) => {
      if (event.target.dataset.id !== 'dropdown') {
        setShowMenu(false);
      }      
    };

    const closeOnEsc = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', menuOutsideClick);
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('click', menuOutsideClick);
      window.addEventListener('keydown', closeOnEsc);
    }
  }, [])
 

  return { toggleMenu, showMenu };
}

