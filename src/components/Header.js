import { useEffect, useState } from "react";
import DynamicHeader from "./DynamicHeader";
import FixedHeader from './FixedHeader';

// Selectively render different headers for mobile vs larger screens
const Header = () => {
  const [mobile, setMobile] = useState(true);

  // Check for smaller device screen width and switch header styles
  useEffect(() => {
    const checkWindowWidth = () => {
      if (window.innerWidth <= 768) {   // 768px is chosen to match 'md' breakpoint in Tailwind
        setMobile(true)
      } else {
        setMobile(false);
      }
    }

    // Call function on window resize
    window.addEventListener('resize', checkWindowWidth);

    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    }
  }, [])

  return (
    <>
      {mobile ? (
        <DynamicHeader />
      ) : (
        <FixedHeader />
      )}
    </>
  )
}

export default Header