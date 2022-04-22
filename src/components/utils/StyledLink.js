import { Link } from "react-router-dom";

const StyledLink = ({ children, to, design, onClick, customStyles }) => {
  // Define CSS styles for different types of buttons
  const designClass = (design) => {
    let CSS = '';
    switch (design) {
      case 'btn-ghost':
        CSS = 'flex items-center justify-center w-full px-4 py-2 font-semibold bg-white text-plum-400 text-md md:text-lg shadow-sm border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'btn-primary':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-plum-400 border border-plum-400 text-white shadow-sm hover:bg-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'btn-teal':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-teal-650 border border-teal-650 shadow-sm text-white hover:bg-teal-550 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30'
        break;
    
      default:
        break;
    }
    return CSS;
  }

  return (
    <>
      <Link to={to} onClick={onClick} className={`${designClass(design)} ${customStyles}`}>
        {children}
      </Link>
    </>
  )
};

export default StyledLink;
