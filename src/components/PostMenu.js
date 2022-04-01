const PostMenu = ({ closeMenu, deletePost, editPost }) => {
  return (
    <div data-testid="post-menu" data-id="post-menu" className="rounded p-2 absolute top-full right-4 shadow-md w-36 bg-white text-left">
      <button data-id="post-menu" onClick={() => {
        editPost();
        closeMenu();
      }} className="bg-white p-2 hover:bg-gray-100 w-full text-left">Edit post</button>
      <button data-id="post-menu" onClick={() => {
        deletePost();
        closeMenu();
      }} className="bg-white p-2 hover:bg-gray-100 w-full text-left">Delete post</button>
    </div>
  )
}

export default PostMenu