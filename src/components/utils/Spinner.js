// Creates a full screen slightly superiorly centered spinner

const Spinner = () => {
  return (
    <div role="status" className="border-[6px] border-plum-500 w-10 h-10 border-t-white rounded-full animate-[spinner_1.5s_infinite_linear]">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner;
