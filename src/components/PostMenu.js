import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

const PostMenu = ({ closeMenu, handleDelete, handleEdit }) => {

  useKeyboardNavigation();

  return (
    <ul id="dropdown" role="menu" aria-label="Post options"  data-testid="dropdown" data-id="dropdown" className="rounded p-1 absolute top-full right-4 shadow-lg w-36 bg-white text-left">
      <li role="none">
        <button aria-haspopup="dialog" role="menuitem" data-id="post-menu" onClick={() => {
        handleEdit();
        closeMenu();
        }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded outline-plum-500 outline-offset-[-1px]">Edit post</button>
      </li>
      <li role="none">
        <button role="menuitem" aria-haspopup="dialog" data-id="post-menu" onClick={() => {
        handleDelete();
        closeMenu();
        }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded outline-plum-500 outline-offset-[-1px]">Delete post</button>
      </li>
    </ul>
  )
}

export default PostMenu