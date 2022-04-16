import Button from './utils/Button';
import like from '../assets/like.png'
import StyledLink from './utils/StyledLink';
import ProfilePic from './utils/ProfilePic';
import LikesModal from './LikesModal';
import { useState } from 'react';
import LikeBtn from './LikeBtn';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useAuthContext } from '../hooks/useAuthContext';
import PostMenu from './PostMenu';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';
import EllipsisIcon from './icons/EllipsisIcon';
import CommentIcon from './icons/CommentIcon';
import { useDropdownMenu } from '../hooks/useDropdownMenu';

const Post = ({ post, updatePosts }) => {
  const { user } = useAuthContext();
  const { showMenu, toggleMenu } = useDropdownMenu();
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // A system for making a local change to the number of likes. This is indepndent of the db, and will be reverted in the case of an error with liking post on the backend
  const [localLike, setLocalLike] = useState(0);

  // Show the comments section of a post by clicking on the numComments button (one way functionality)
  const [showComments, setShowComments] = useState(false);

  // A more up-to-date comment count that can be retrieved without making a new API call to update the entire post component. Updates from within the Comments component. Initialised to the number of comments at initial post data fetch.
  const [newCommentCount, setNewCommentCount] = useState(post.numComments);

  // A key that is passed to the comments component. When a user successfully posts a comment with the comment form, the comments component should be re-rendered in full (thereby calling comments fetch to update with new comment). The re-render will be achieved by randomising this key on successful comment post
  const [updateKey, setUpdateKey] = useState(0);

  const customiseCommentText = (numComments) => {
    if (numComments === 0) {
      return 'No comments';
    }

    if (numComments === 1) {    // remove plural
      return '1 comment';
    }

    // No adjustment necessary, return typical 'x comments' format
    return `${numComments} comments`
  };

  return (
    <>
    <article className="rounded shadow-sm bg-white mb-6 pt-3 pb-1">
      <div className='flex items-center justify-between px-4'>
        <div className='flex items-center justify-start'>
          {/* Link to user's profile */}
          <StyledLink to={`/profile/${post.user._id}`} customStyles="hover:opacity-95 active:opacity-100">
            <ProfilePic imgUrl={post.user.profilePic ? post.user.profilePic.imageUrl : null} styles="w-10 h-10 mr-2 sm:mr-3 rounded-full"/>
          </StyledLink>
          <div>
            {/* Link to the user's profile page */}
            <StyledLink to={`/profile/${post.user._id}`} customStyles="block font-bold hover:underline sm:text-base text-sm max-w-[200px]">{post.user.fullName}</StyledLink>
            <p className="block text-xs sm:text-sm text-gray-600">{post.datePosted}</p>
          </div>
        </div>
        <div className='relative'>
          {post.user._id === user._id && (
            <button data-id="dropdown" onClick={toggleMenu} data-testid="post-menu" className='px-2 py-1 rounded hover:bg-gray-100 active:bg-gray-200'>
              <EllipsisIcon iconFill="#000" iconStyles='w-4 pointer-events-none' />
            </button>
          )}
          
          {showMenu && (
            <PostMenu closeMenu={toggleMenu} handleDelete={() => setShowDeleteModal(true)} handleEdit={() => setShowEditModal(true)}/>
          )}
        </div>
       
      </div>
      <div>
        <p className='px-4 py-2'>{post.text}</p>
        {post.image && (
          <img src={post.image.imageUrl} alt="" className='w-full' />
        )}
      </div>
      <div className='flex items-center justify-between px-4 py-2'>
        {/* Show modal listing user's who have liked (name + profile pic) */}
        <Button customStyles="text-sm text-gray-600 flex items-center justify-center hover:underline hover:decoration-gray-600" onClick={() => setShowLikesModal(true)}>
          <img src={like} alt="Love heart" className='w-4 mr-1 mb-px' />
          <span className='mt-px'>{post.numLikes + localLike}</span>
        </Button>
        {/* Fetch comments and append to the DOM below this section */}

        <Button customStyles="text-sm text-gray-600 hover:underline hover:decoration-gray-600" onClick={() => {
          if (post.numComments > 0) { setShowComments(true) }
        }}>
          {/* Adjust the displayed number of comments to match the most up-to-date source numComments */}
          {customiseCommentText(newCommentCount)}
        </Button>

      </div>
      <div className={`flex items-center justify-evenly mx-4 border-t pt-1 ${showComments && 'border-b mb-6 py-1'}`}>
        <LikeBtn post={post} setLocalLike={setLocalLike}/>
        <Button customStyles="flex items-middle justify-center text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-full" onClick={() => setShowComments(true)}>
          <CommentIcon iconFill='#6b7280' iconStyles='w-6 mr-2'/>
          Comment
        </Button>
      </div>
      
      {showComments && (
        <div>
          <CommentForm postId={post._id} updateComments={setUpdateKey}/>
          <Comments postId={post._id} updateCommentCount={setNewCommentCount} updateKey={setUpdateKey} key={updateKey}/>
        </div>
      )}
    </article>

    {showLikesModal && (<LikesModal postId={post._id} closeModal={() => setShowLikesModal(false)}/>)}

    {showDeleteModal && (<DeletePostModal postId={post._id} closeModal={() => setShowDeleteModal(false)} updatePosts={updatePosts}/>)}

    {showEditModal && (<EditPostModal post={post} closeModal={() => setShowEditModal(false)} updatePosts={updatePosts}/>)}
    </>
  )
}

export default Post