import { useState } from "react";
import CreatePostModal from "./modals/CreatePostModal";
import PlusIcon from './icons/PlusIcon'

const CreatePost = ({ updatePosts, nav }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Nav prop indicates whether this create post component is in the nav or not */}
      {nav ? (
        <button role="menuitem" onClick={() => setShowModal(true)} className='outline-plum-600 outline-offset-[-2px]' aria-haspopup="dialog">
          <div className="py-0.5 px-4 hover:bg-gray-100 flex flex-col items-center justify-center lg:rounded">
            <PlusIcon iconFill="#51557d" iconStyles="w-[22px] h-7 lg:w-[25px] lg:h-8"/>
            <span className="text-xs">Post</span>
          </div>
        </button>
      ) : (
        <div className="w-full rounded bg-white p-1 mb-6 flex flex-col items-center justify-center max-w-3xl lg:min-w-full shadow-sm" aria-haspopup="dialog">
          <button className="w-full px-3 py-2 bg-white rounded hover:bg-gray-100 active:bg-gray-200 flex items-center justify-start outline-2 outline-plum-600" onClick={() => setShowModal(true)}>
            <PlusIcon iconFill="#50547C" iconStyles="w-8 mr-3"/>
            <div className="text-left">
              <p className="font-semibold md:text-lg -mb-0.5">Create a Post</p>
              <p className="text-gray-500 text-sm md:text-base">Share a photo or write something.</p>
            </div>
          </button>
        </div>
      )}
      
      {showModal && (
        <CreatePostModal closeModal={() => setShowModal(false)} updatePosts={updatePosts}/>
      )}
    </>
  )
}

export default CreatePost;