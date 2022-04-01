import Button from './utils/Button';
import like from '../assets/like.png'
import StyledLink from './utils/StyledLink';
import ProfilePic from './utils/ProfilePic';
import LikesModal from './LikesModal';
import { useState, useEffect, useCallback } from 'react';
import LikeBtn from './LikeBtn';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useAuthContext } from '../hooks/useAuthContext';
import PostMenu from './PostMenu';

const Post = ({ post }) => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  // A system for making a local change to the number of likes. This is indepndent of the db, and will be reverted in the case of an error with liking post on the backend
  const [localLike, setLocalLike] = useState(0);

  // Show the comments section of a post by clicking on the numComments button (one way functionality)
  const [showComments, setShowComments] = useState(false);

  // A more up-to-date comment count that can be retrieved without making a new API call to update the entire post component. Updates from within the Comments component. Initialised to the number of comments at initial post data fetch.
  const [newCommentCount, setNewCommentCount] = useState(post.numComments);

  // A key that is passed to the comments component. When a user successfully posts a comment with the comment form, the comments component should be re-rendered in full (thereby calling comments fetch to update with new comment). The re-render will be achieved by randomising this key on successful comment post
  const [updateKey, setUpdateKey] = useState(0);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };


  // Runs once only on initial mount, and cleans up on dismount
  useEffect(() => {
    // Ensure the post menu closes on outside click with a global window event listener
    const menuOutsideClick = (event) => {
      if (event.target.dataset.id !== 'post-menu') {
        setShowMenu(false);
      }      
    };

    const closeOnEsc = (event) => {
      if (event.key === 'Escape') {
        console.log('Escape pressed');
        setShowMenu(false);
      }
    };

    window.addEventListener('click', menuOutsideClick);
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('click', menuOutsideClick);
      window.addEventListener('keydown', closeOnEsc);
    }
  }, [])

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
            <ProfilePic imgUrl={post.user.profilePic ? post.user.profilePic.imageUrl : null} styles="w-10 mr-2 sm:mr-3 rounded-full"/>
          </StyledLink>
          <div>
            {/* Link to the user's profile page */}
            <StyledLink to={`/profile/${post.user._id}`} customStyles="block font-bold hover:underline sm:text-base text-sm max-w-[200px]">{post.user.fullName}</StyledLink>
            <p className="block text-xs sm:text-sm text-gray-600">{post.datePosted}</p>
          </div>
        </div>
        <div className='relative'>
          {post.user._id === user._id && (
            <button data-id="post-menu" onClick={toggleMenu} data-testid="menu" className='px-2 py-1 rounded hover:bg-gray-100 active:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-4 pointer-events-none'>
                <path d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"/>
              </svg>
            </button>
          )}
          
          {showMenu && (
            <PostMenu closeMenu={toggleMenu}/>
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
        <Button customStyles="text-sm text-gray-600 flex items-center justify-center hover:underline hover:decoration-gray-600" onClick={() => setShowModal(true)}>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6 mr-2'>
            <path fill='#6b7280' d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/>
          </svg>
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
    {showModal && (<LikesModal postId={post._id} closeModal={() => setShowModal(false)}/>)}
    </>
  )
}

export default Post