// Loading spinner. Is not set to any specific position on the screen, so can be useful to set a max width/height div to srround this, and flex center the spinner to get a central screen spinner
const Spinner = () => {
  return (
    <div role="status" className="border-[6px] border-plum-500 w-10 h-10 border-t-white rounded-full animate-[spinner_1.5s_infinite_linear]">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner;
