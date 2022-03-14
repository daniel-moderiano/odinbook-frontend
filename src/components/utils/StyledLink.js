import { Link } from "react-router-dom";

const StyledLink = ({ children, to, design, onClick, customStyles }) => {
  // Define CSS styles for different types of buttons
  const designClass = (design) => {
    let CSS = '';
    switch (design) {
      case 'text-link':
        CSS = 'text-plum-600 underline hover:no-underline'
        break;

      case 'btn-primary':
        CSS = 'w-full px-4 py-2 font-medium bg-plum-400 text-white text-md md:text-lg shadow-md hover:bg-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'btn-ghost':
        CSS = 'w-full text-center px-4 py-2 font-semibold bg-white text-plum-400 text-md md:text-lg shadow-md border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'btn-secondary':
        CSS = 'flex items-center justify-center w-full px-4 py-2 font-semibold bg-teal-650 shadow-md text-white text-md md:text-lg hover:bg-teal-550 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30'
        break;

      case 'btn-secondary-sm':
        CSS = 'flex items-center justify-center w-full text-center px-2 py-2 text-sm font-medium bg-teal-650 shadow-md text-white hover:bg-teal-550 md:text-base focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30'
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

StyledLink.defaultProps = {
  design: 'text-link',
  customStyles: '',
}

export default StyledLink
