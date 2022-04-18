
const PostMenu = ({ closeMenu, handleDelete, handleEdit }) => {
  return (
    <div data-testid="dropdown" data-id="dropdown" className="rounded p-1 absolute top-full right-4 shadow-lg w-36 bg-white text-left">
      <button data-id="post-menu" onClick={() => {
        handleEdit();
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded outline-plum-500 outline-offset-[-1px]">Edit post</button>
      <button data-id="post-menu" onClick={() => {
        handleDelete();
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded outline-plum-500 outline-offset-[-1px]">Delete post</button>
    </div>
  )
}

export default PostMenu