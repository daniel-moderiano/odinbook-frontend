import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useToastContext } from '../context/ToastContext';
import { useEffect } from 'react';

const SendRequestBtn = ({ userId }) => {
  const { request, response, loading, error } = useFriendRequests(userId);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  useEffect(() => {
    if (response) {
      showToast('success', 'Request sent.')
    }
  }, [response, showToast])

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = () => {
    if (loading) {
      return 'Sending...';
    }

    if (error) {
      return 'Add Friend';
    }

    if (response) {
      return 'Sent!'
    }

    // Default state should be returned
    return 'Add Friend';
  }

  return (
    <Button onClick={() => request('sendRequest')} design="primary" customStyles="w-32 sm:w-36" disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default SendRequestBtn