const Spinner = () => {
  return (
    <div role="status" className="-mt-32 border-[6px] border-plum-500 w-10 h-10 border-t-white rounded-full w animate-[spinner_1.5s_infinite_linear]">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner;
