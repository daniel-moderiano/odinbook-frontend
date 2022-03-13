const Button = ({ children, type, design, onClick, customStyles }) => {
  // Define CSS styles for different types of buttons
  const designClass = (design) => {
    let CSS = '';
    switch (design) {
      case 'primary':
        CSS = 'w-full px-4 py-2 font-medium bg-plum-400 text-white text-md md:text-lg shadow-md hover:bg-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'ghost':
        CSS = 'w-full px-4 py-2 font-semibold bg-white text-plum-400 text-md md:text-lg shadow-md border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'secondary':
        CSS = 'w-full text-center px-2 py-2 text-sm font-medium bg-teal-650 shadow-md text-white hover:bg-teal-550 md:text-base focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30'
        break;
    
      default:
        break;
    }
    return CSS;
  }

  return (
    <button onClick={onClick} type={type} className={`${designClass(design)} ${customStyles}`}>
      {children}
    </button>
  )
};

Button.defaultProps = {
  design: 'primary',
  type: 'button',
  customStyles: '',
}

export default Button
