import { useTestLogin } from "../hooks/useTestLogin";
import { useErrorToast } from "../hooks/useErrorToast";

const TestLogin = () => {
  const { testLogin, testError, testLoading } = useTestLogin();

  useErrorToast(testError, 'An unknown error occurred while logging in');

  return (
    <button 
      onClick={testLogin} 
      type="button" 
      className="font-semibold mt-3 flex items-center justify-center w-full px-2 py-1 bg-white text-teal-750 shadow-sm border border-teal-750 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-550/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 mr-2" >
        <path fill="#218381" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/>
        </svg>
      <span>
        {testLoading ? 'Logging in...': 'Try a test account'}
      </span>
    </button>
  )
}

export default TestLogin;