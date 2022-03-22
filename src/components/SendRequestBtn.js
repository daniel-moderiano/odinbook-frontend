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

  // Set out the conditionals in order of which they should be evaluated
  const setBtnText = (loadingState, errorState, successState) => {
    if (loadingState) {
      return 'Sending...';
    }

    if (errorState) {
      return 'Add Friend';
    }

    if (successState) {
      return 'Sent!'
    }

    // Default state should be returned
    return 'Add Friend';
  }

  return (
    <Button onClick={() => { sendRequest(userId) }} design="primary" customStyles="w-32 sm:w-36" disabled={response ? true : false}>
      {setBtnText(loading, error, response)}
    </Button>
  )
}

export default SendRequestBtn