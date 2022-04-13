import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useErrorToast } from '../hooks/useErrorToast';
import { useSuccessToast } from '../hooks/useSuccessToast';

const CancelRequestBtn = ({ userId }) => {
  const { request, response, loading, error } = useFriendRequests(userId);

  // Set up notifications. Backend error messages are well suited for direct frontend use here
  // Must use conditional for error.errorMsg to avoid TypeError of undefined before error is initialised/true
  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Request cancelled.');

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = () => {
    if (loading) {
      return 'Cancelling...';
    }

    if (error) {
      return 'Cancel';
    }

    if (response) {
      return 'Cancelled!'
    }

    // Default state should be returned
    return 'Cancel';
  }

  return (
    <Button onClick={() => request('cancelRequest')} design="primary" customStyles="w-32 sm:w-36" disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default CancelRequestBtn