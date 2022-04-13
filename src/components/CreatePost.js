import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import PlusIcon from './icons/PlusIcon'

const CreatePost = ({ updatePosts }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full rounded bg-white p-1 mb-6 flex flex-col items-center justify-center max-w-3xl lg:min-w-full shadow-sm">
      <button className="w-full px-3 py-2 bg-white rounded hover:bg-gray-100 flex items-center justify-start" onClick={() => setShowModal(true)}>
        <PlusIcon iconFill="#50547C" iconStyles="w-8 mr-3"/>
        <div className="text-left">
          <p className="font-semibold md:text-lg -mb-0.5">Create a Post</p>
          <p className="text-gray-500 text-sm md:text-base">Share a photo or write something.</p>
        </div>
      </button>

      {showModal && (
        <CreatePostModal closeModal={() => setShowModal(false)} updatePosts={updatePosts}/>
      )}
    </div>
  )
}

export default CreatePost;