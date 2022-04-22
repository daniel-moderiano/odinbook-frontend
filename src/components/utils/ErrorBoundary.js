import React from 'react';
import Button from './Button';

// Code taken from the React Error Boundary docs with small adjustments. Used to catch component wide errors (errors of any children components that are not handled at the time of throwing)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Set initial error state to false, with no message
    this.state = { 
      hasError: false,
      errorMsg: '',
    };
  }

  static getDerivedStateFromError(error) {
    // Update hasError state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Set the error message for any custom message handling in UI
    this.setState({ errorMsg: error.message });
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI to render here. Because this is targetting the FB auth back btn error, a reload page btn is included
      return (
        <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
          <div className="flex flex-col items-center justify-center">
            <h1 className='text-3xl font-semibold text-plum-500 mb-4'>An error occurred</h1>
            <Button design="secondary" customStyles="w-36" onClick={() => window.location.reload()}>Reload page</Button>
          </div>
        </div>
      )
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;