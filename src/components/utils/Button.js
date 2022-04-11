const Button = ({ 
  children, 
  type, 
  design, 
  onClick, 
  customStyles, 
  disabled,
}) => {
  // Define CSS styles for different types of buttons
  const designClass = (design) => {
    let CSS = '';
    switch (design) {
      case 'primary-lg':
        CSS = 'flex items-center justify-center w-full px-4 py-2 font-medium bg-plum-400 border border-plum-400 text-white text-md md:text-lg shadow-sm hover:bg-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-600'
        break;

      case 'ghost-lg':
        CSS = 'flex items-center justify-center w-full px-4 py-2 font-semibold bg-white text-plum-500 text-md md:text-lg shadow-sm border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'secondary-lg':
        CSS = 'flex items-center justify-center w-full px-4 py-2 font-semibold bg-white text-plum-500 text-md md:text-lg shadow-sm border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30'
        break;

      case 'teal-lg':
        CSS = 'flex items-center justify-center w-full px-4 py-2 font-semibold bg-teal-650 border border-teal-650  shadow-sm text-white text-md md:text-lg hover:bg-teal-550 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30'
        break;

      case 'primary':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-plum-400 border border-plum-400 text-white shadow-sm hover:bg-plum-300 hover:border-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'
        break;
    
      case 'secondary':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-gray-200 border border-gray-200 text-black shadow-sm hover:bg-gray-200/80 hover:border-gray-200/10 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-gray-300 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none'
        break;

      case 'danger':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-red-200 border border-gray-200 text-black shadow-sm hover:bg-gray-200/80 hover:border-gray-200/10 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-gray-300/30 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none'
        break;

      case 'ghost':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-white text-plum-500 shadow-sm border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'
        break;

      case 'teal':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-teal-650 border border-teal-650  shadow-sm text-white hover:bg-teal-550 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-650/30'
        break;
    
      default:
        break;
    }
    return CSS;
  }

  return (
    <button 
      onClick={onClick} 
      type={type} 
      className={`${designClass(design)} ${customStyles}`} 
      disabled={disabled ? true : undefined}
    >
      {children}
    </button>
  )
};

Button.defaultProps = {
  type: 'button',
  customStyles: '',
}

export default Button
