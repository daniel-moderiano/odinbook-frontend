import Button from './utils/Button';
import { useFriendRequests } from '../hooks/useFriendRequests';
import { useEffect } from 'react';

const SendRequestBtn = ({ userId }) => {
  const { sendRequest, response, loading, error } = useFriendRequests();

  // useEffect(() => {
  //   console.log(response);
  // }, [response])

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {

  }, [])

  return (
    <Button onClick={() => { sendRequest(userId) }} design="primary" customStyles="w-32 sm:w-36">
      {loading ? (
        'Sending...'
      ) : (
        'Add Friend'
      )}     

      {/* Regardless of */}
      {response && (
        'Request sent'
      )}
    </Button>
  )
}

export default SendRequestBtn