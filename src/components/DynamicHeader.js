import ProfilePic from './utils/ProfilePic';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const DynamicHeader = () => {
  const { user } = useAuthContext();
  const [showHeader, setShowHeader] = useState(true);

  // As an example of how the scroll effect works. User is at top of screen, so previousScroll is initialised to 0. When the user scrolls, a scroll event is triggered, calling the checkScroll function. This will initialise the currentScroll variable to wherever they have scrolled to, e.g. 10px. Thus we will have previousScroll 0 and currentScroll 10. Comparing them shows previousScroll < currentScroll, which means this indicates a downard scroll, adn vice versa for upward scroll.

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
      console.log(previousScroll, currentScroll);

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
  }, [])




  return (
    <div data-testid="dynamic" className={`fixed flex w-full h-[50px] bg-white shadow-md items-center justify-start ${showHeader ? 'top-0' : 'top-[-50px]'} transition-all duration-300 px-4`}>
        <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="w-9 h-9 rounded-full"/>
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </div>
  )
}

export default DynamicHeader