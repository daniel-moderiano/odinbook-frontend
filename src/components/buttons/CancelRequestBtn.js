import Button from '../utils/Button';
import { useFriendRequests } from '../../hooks/useFriendRequests';
import { useErrorToast } from '../../hooks/useErrorToast';
import { useSuccessToast } from '../../hooks/useSuccessToast';

// Used to cancel a friend request you have sent
const CancelRequestBtn = ({ userId, customStyles }) => {
  const { request, response, loading, error } = useFriendRequests(userId);

  // Set up notifications. Backend error messages are well suited for direct frontend use here
  // Must use conditional for error.errorMsg to avoid TypeError of undefined before error is initialised/true
  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Request cancelled.');

  // Dynamically set button text to indicate loading state
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
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
    <Button onClick={() => request('cancelRequest')} design="primary" customStyles={customStyles} disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default CancelRequestBtn