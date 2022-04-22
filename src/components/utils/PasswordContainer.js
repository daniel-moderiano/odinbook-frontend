import EyeIcon from '../icons/EyeIcon';
import EyeWithLineIcon from '../icons/EyeWithLineIcon';

// Used to house a input/label, and provide a show/hide functionality for passwords
const PasswordContainer = ({ children, showPassword, handleClick }) => {
  return (
    <div className="w-full relative">
      {/* Expect password input/label here */}
      {children}

      <button className="w-5 h-5 absolute top-[17px] md:top-[19px] right-3 bg-transparent z-2 rounded outline-plum-600" type="button" aria-label={`${showPassword ? 'Show password as plain text. Warning: this will display your password on the screen.' : 'Hide password.'}`} onClick={handleClick}>
      <div className="w-5 h-5 absolute bg-white opacity-50 pointer-events-none"></div>
      {showPassword ? (
        <EyeIcon />
      ) : (
        <EyeWithLineIcon />
      )}
    </button>
  </div>
  )
}

export default PasswordContainer;
