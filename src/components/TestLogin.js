import { useTestLogin } from "../hooks/useTestLogin";
import { useErrorToast } from "../hooks/useErrorToast";
import UserIcon from "./icons/UserIcon";

const TestLogin = () => {
  const { testLogin, testError, testLoading } = useTestLogin();

  useErrorToast(testError, 'An unknown error occurred while logging in');

  return (
    <button 
      onClick={testLogin} 
      type="button" 
      className="font-semibold mt-3 flex items-center justify-center w-full px-2 py-1 bg-white text-teal-750 shadow-sm border border-teal-750 hover:bg-plum-50 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-teal-550/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-100">
      <UserIcon iconFill="#218381" iconStyles="w-4 mr-2"/>
      <span>
        {testLoading ? 'Logging in...': 'Try a test account'}
      </span>
    </button>
  )
}

export default TestLogin;