const Button = ({ 
  children, 
  type, 
  design, 
  onClick, 
  customStyles, 
  disabled,
  hasPopup,
  expanded,
  ariaLabel,
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

      case 'primary':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-plum-400 border border-plum-400 text-white shadow-sm hover:bg-plum-300 hover:border-plum-300 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'
        break;

      case 'danger':
        CSS = 'bg-red-500 text-white w-full px-2 py-1 hover:bg-red-600 shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-red-300/70 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'
        break;

      case 'ghost':
        CSS = 'flex items-center justify-center w-full px-2 py-1 bg-white text-plum-500 shadow-sm border border-plum-400 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100'
        break;

      case 'teal-ghost':
        CSS = "font-semibold mt-3 flex items-center justify-center w-full px-2 py-1 bg-white text-teal-750 shadow-sm border border-teal-750 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-550/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100";
        break;
      
      case 'secondary': 
        CSS = 'bg-gray-100 text-gray-800 max-w-[100px] w-full px-2 py-1 mr-2 hover:bg-gray-200 shadow-sm  focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-gray-400/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100';
        break;
      
      case 'modal-close':
        CSS = 'rounded-full p-1 hover:bg-gray-100 active:scale-0.95 outline-plum-600';
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
      aria-haspopup={hasPopup}
      aria-expanded={expanded}
      aria-label={ariaLabel}
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
