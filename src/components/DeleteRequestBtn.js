import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useErrorToast } from '../hooks/useErrorToast';
import { useSuccessToast } from '../hooks/useSuccessToast';

const DeleteRequestBtn = ({ userId }) => {
  const { request, response, loading, error } = useFriendRequests(userId);
  
  // Set up notifications. Backend error messages are well suited for direct frontend use here
  // Must use conditional for error.errorMsg to avoid TypeError of undefined before error is initialised/true
  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Request deleted.');

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = () => {
    if (loading) {
      return 'Deleting...';
    }

    if (error) {
      return 'Delete';
    }

    if (response) {
      return 'Deleted!'
    }

    // Default state should be returned
    return 'Delete';
  }

  return (
    <Button onClick={() => request('deleteRequest')} design="ghost" disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default DeleteRequestBtn;