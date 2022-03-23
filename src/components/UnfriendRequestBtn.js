import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useToastContext } from '../context/ToastContext';
import { useEffect } from 'react';

const UnfriendRequestBtn = ({ userId }) => {
  const { request, response, loading, error } = useFriendRequests(userId);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast])

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
    <Button onClick={() => request('unfriendRequest')} design="primary" customStyles="w-32 sm:w-36" disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default UnfriendRequestBtn