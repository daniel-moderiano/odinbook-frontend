import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useErrorToast } from '../hooks/useErrorToast';
import { useSuccessToast } from '../hooks/useSuccessToast';

const UnfriendRequestBtn = ({ userId, customStyles }) => {
  const { request, response, loading, error } = useFriendRequests(userId);

  // Set up notifications. Backend error messages are well suited for direct frontend use here
  // Must use conditional for error.errorMsg to avoid TypeError of undefined before error is initialised/true
  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Friend removed.');

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = () => {
    if (loading) {
      return 'Removing...';
    }

    if (error) {
      return 'Unfriend';
    }

    if (response) {
      return 'Removed!'
    }

    // Default state should be returned
    return 'Unfriend';
  }

  return (
    <Button onClick={() => request('unfriendRequest')} design="primary" customStyles={customStyles} disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default UnfriendRequestBtn;