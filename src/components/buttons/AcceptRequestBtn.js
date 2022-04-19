import Button from '../utils/Button';
import { useFriendRequests } from '../../hooks/useFriendRequests';
import { useErrorToast } from '../../hooks/useErrorToast';
import { useSuccessToast } from '../../hooks/useSuccessToast';

const AcceptRequestBtn = ({ userId, customStyles }) => {
  const { request, response, loading, error } = useFriendRequests(userId);

  // Set up notifications. Backend error messages are well suited for direct frontend use here
  // Must use conditional for error.errorMsg to avoid TypeError of undefined before error is initialised/true
  useErrorToast(error, (error && error.errorMsg));
  useSuccessToast(response, 'Request accepted.');

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = () => {
    if (loading) {
      return 'Accepting...';
    }

    if (error) {
      return 'Accept';
    }

    if (response) {
      return 'Accepted!'
    }

    // Default state should be returned
    return 'Accept';
  }

  return (
    <Button onClick={() => request('acceptRequest')} design="primary" customStyles={customStyles} disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default AcceptRequestBtn