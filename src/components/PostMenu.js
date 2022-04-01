const PostMenu = ({ closeMenu }) => {
  return (
    <div data-testid="post-menu" className="rounded p-2">
      <button onClick={() => {
        closeMenu();
      }} className="bg-white p-2 hover:bg-gray-100">Edit post</button>
      <button onClick={() => {
        closeMenu();
      }} className="bg-white p-2 hover:bg-gray-100">Delete post</button>
    </div>
  )
}

export default PostMenu