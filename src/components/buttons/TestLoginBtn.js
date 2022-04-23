import { useTestLogin } from "../../hooks/useTestLogin";
import { useErrorToast } from "../../hooks/useErrorToast";
import UserIcon from "../icons/UserIcon";
import Button from "../utils/Button";

// Simple contained btn component that logs in test account
const TestLoginBtn = () => {
  const { testLogin, testError, testLoading } = useTestLogin();

  useErrorToast(testError, 'An unknown error occurred while logging in');

  return (
    <Button onClick={testLogin} design="teal-ghost">
      <UserIcon iconFill="#218381" iconStyles="w-4 mr-2"/>
      <span>
        {testLoading ? 'Logging in...': 'Try a demo account'}
      </span>
    </Button>
  )
}

export default TestLoginBtn;