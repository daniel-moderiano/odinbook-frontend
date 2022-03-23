import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useToastContext } from '../context/ToastContext';
import { useEffect } from 'react';

const DeleteRequestBtn = ({ userId }) => {
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

export default DeleteRequestBtn