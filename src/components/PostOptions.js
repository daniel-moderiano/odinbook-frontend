import { useState } from 'react';
import EllipsisIcon from './icons/EllipsisIcon';
import PostMenu from './PostMenu';
import DeletePostModal from './modals/DeletePostModal';
import EditPostModal from './modals/EditPostModal';

// House all functionality related to user options on posts, namely editing or deleting posts
const PostOptions = ({ post, updatePosts }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      {/* Button to oper PostMenu */}
      <div className='relative'>
        <button aria-controls="NavDropdown" aria-haspopup="true" aria-expanded={showMenu} aria-label="Open post options menu" data-id="dropdown" onClick={() => {setShowMenu((prevState) => !prevState)}} data-testid="post-menu" className='px-2 py-1 rounded hover:bg-gray-100 active:bg-gray-200 outline-plum-600'>
          <EllipsisIcon iconFill="#000" iconStyles='w-4 pointer-events-none' />
        </button>

        {/* Menu containing access to post options */}
        {showMenu && (
          <PostMenu closeMenu={() => setShowMenu(false)} handleDelete={() => setShowDeleteModal(true)} handleEdit={() => setShowEditModal(true)} />
        )}
      </div>

      {/* Modals */}
      {showDeleteModal && (<DeletePostModal postId={post._id} closeModal={() => setShowDeleteModal(false)} updatePosts={updatePosts} />)}
      {showEditModal && (<EditPostModal post={post} closeModal={() => setShowEditModal(false)} updatePosts={updatePosts} />)}
    </>
  )
}

export default PostOptions