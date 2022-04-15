import { useEffect, useState } from "react";

// As an example of how the scroll effect works. User is at top of screen, so previousScroll is initialised to 0. When the user scrolls, a scroll event is triggered, calling the checkScroll function. This will initialise the currentScroll variable to wherever they have scrolled to, e.g. 10px. Thus we will have previousScroll 0 and currentScroll 10. Comparing them shows previousScroll < currentScroll, which means this indicates a downard scroll, and vice versa for upward scroll.
export const useScrollHeader = () => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // Initialise all direction and scroll variables here
    let previousScroll = window.scrollY;    // initialised the 'previous' scroll to the current window position
    let currentScroll;
    // 0 = initial, 1 = scrolling up, 2 = scrolling down
    let direction = 0;
    let previousDirection = 0;
    
    
    // Hide or show header based on the current direction of scroll
    const toggleHeader = (direction, currentScroll) => {
      // Do not toggle header until the current scroll value is greater than the height of the header (50px)
      if (direction === 2) {     // User is scrolling down
        setShowHeader(false);
      }
      else if (direction === 1) {   // User is scrolling up; show header
        setShowHeader(true);
      }

      // Reset previous direction. This will avoid calling toggleHeader unneccessarily if user continues scrolling in same direction
      previousDirection = direction;
    }
    
    // Judge the direction of scroll based on window scroll position relative to starting/previous scroll
    const checkScroll = () => {  
      // Only initialise current scroll to window position at the time of calling checkScroll function
      currentScroll = window.scrollY;

      if (currentScroll > previousScroll) {   // user is scrolling down, set direction accordingly
        direction = 2;
      } else if (currentScroll < previousScroll) {    // user is scrolling up, set direction accordingly
        direction = 1;
      }

      // Only toggle header when there is a change in direction
      if (direction !== previousDirection) {
        toggleHeader(direction, currentScroll);
      }

      // Equalise the scrolls here to allow and offset of the two between scroll and scroll event capture
      previousScroll = currentScroll;
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return { showHeader }
}

