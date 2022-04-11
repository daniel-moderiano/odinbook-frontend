import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useToastContext } from '../context/ToastContext';
import { useEffect } from 'react';

const AcceptRequestBtn = ({ userId }) => {
  const { request, response, loading, error } = useFriendRequests(userId);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  
  useEffect(() => {
    if (response) {
      showToast('success', 'Request accepted.')
    }
  }, [response, showToast])

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
    <Button onClick={() => request('acceptRequest')} design="primary" customStyles="mr-3 lg:mr-0 lg:mb-2" disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default AcceptRequestBtn