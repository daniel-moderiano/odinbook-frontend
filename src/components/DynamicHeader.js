import ProfilePic from './utils/ProfilePic';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const DynamicHeader = () => {
  const { user } = useAuthContext();
  const [showHeader, setShowHeader] = useState(true);


  useEffect(() => {
    
    const toggleHeader = (direction, currentScroll) => {
      if (direction === 2) { 

        //replace 52 with the height of your header in px
      // User is scrolling down
      setShowHeader(false);
      }
      else if (direction === 1) {
      // User is scrolling up
      setShowHeader(true);
      }

      previousDirection = direction;


    }
    
    // Initialise scroll variables here
    let previousScroll = window.scrollY;
    let direction = 0;
    let previousDirection = 0;
    let currentScroll;

    const checkScroll = () => {  
      // Find the direction of the scroll
      // 0 = initial, 1 = scrolling up, 2 = scrolling down
      currentScroll = window.scrollY;

      if (currentScroll > previousScroll) {
        direction = 2;
        console.log('Scrolled up');
      } else if (currentScroll < previousScroll) {
        direction = 1;
        console.log('Scrolled down');
      }

      if (direction !== previousDirection) {
        toggleHeader(direction, currentScroll);
      }

      previousScroll = currentScroll;
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    }
  })




  return (
    <div className={`fixed flex w-full h-[50px] bg-white shadow-md items-center justify-start ${showHeader ? 'top-0' : 'top-[-50px]'} transition-all duration-300`}>
        <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="w-12 h-12 rounded-full"/>
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </div>
  )
}

export default DynamicHeader