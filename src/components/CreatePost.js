import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const CreatePost = ({ updateFeed }) => {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="w-full rounded bg-white p-1 mb-6 flex flex-col items-center justify-center max-w-3xl lg:min-w-full shadow-sm">
      <button className="w-full px-3 py-2 bg-white rounded hover:bg-gray-100 flex items-center justify-start" onClick={() => setShowModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 mr-3">
          <path fill="#50547C" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/>
        </svg>
        <div className="text-left">
          <p className="font-semibold md:text-lg -mb-0.5">Create a Post</p>
          <p className="text-gray-500 text-sm md:text-base">Share a photo or write something.</p>
        </div>
      </button>

      {showModal && (
        <CreatePostModal closeModal={() => setShowModal(false)} updateFeed={updateFeed}/>
      )}
    </div>
  )
}

export default CreatePost;