// Creates a full screen slightly superiorly centered spinner

const Spinner = ({ loading }) => {
  return (
    <>
      {loading && (
  
        <div className="w-full h-screen flex items-center justify-center">
          <div role="status" className="-mt-32 border-[6px] border-plum-500 w-10 h-10 border-t-white rounded-full w animate-[spinner_1.5s_infinite_linear]">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Spinner;
