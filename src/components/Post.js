import Button from './utils/Button';
import like from '../assets/like.png'
import ProfilePic from './utils/ProfilePic';
import LikesModal from './modals/LikesModal';
import { useCallback, useState } from 'react';
import LikeBtn from './buttons/LikeBtn';
import Comments from './Comments';
import PostCommentForm from './PostCommentForm';
import { useAuthContext } from '../hooks/useAuthContext';
import CommentIcon from './icons/CommentIcon';
import { Link } from 'react-router-dom';
import PostOptions from './PostOptions';

const Post = ({ post, updatePosts }) => {
  const { user } = useAuthContext();

  const [showLikesModal, setShowLikesModal] = useState(false);

  // A system for making a local change to the number of likes. This is indepndent of the db, and will be reverted in the case of an error with liking post on the backend
  const [localLike, setLocalLike] = useState(0);

  // Show the comments section of a post by clicking on the numComments button (one way functionality)
  const [showComments, setShowComments] = useState(false);

  // A more up-to-date comment count that can be retrieved without making a new API call to update the entire post component. Updates from within the Comments component. Initialised to the number of comments at initial post data fetch.
  const [newCommentCount, setNewCommentCount] = useState(post.numComments);

  // A key that is passed to the comments component. When a user successfully posts a comment with the comment form, the comments component should be re-rendered in full (thereby calling comments fetch to update with new comment). The re-render will be achieved by randomising this key on successful comment post
  const [updateKey, setUpdateKey] = useState(0);

  // Function to update the key to a random value, hence triggering re-rendering of the comments component. In essence, updating comments.
  const updateComments = useCallback(() => {
    setUpdateKey(Math.random());
  }, [])

  return (
    <>
      <article className="rounded shadow-sm bg-white mb-6 pt-3 pb-1">

        {/* Header section */}
        <section className='flex items-center justify-between px-4'>
          <div className='flex items-center justify-start'>
            <Link to={`/profile/${post.user._id}`} className="hover:opacity-95 active:opacity-100 mr-2 sm:mr-3 outline-plum-600">
              <ProfilePic image={post.user.profilePic && post.user.profilePic} styles="w-10 h-10  rounded-full" />
            </Link>
            <div>
              <h4>
                <Link to={`/profile/${post.user._id}`} className="font-bold hover:underline sm:text-base text-sm max-w-[200px] outline-plum-600 outline-offset-2">{post.user.fullName}</Link>
              </h4>
              <p className="block text-xs sm:text-sm text-gray-600">{post.datePosted}</p>
            </div>
          </div>

          {/* Button to access post options menu. Only visible to user's own posts */}
          {post.user._id === user._id && (
            <PostOptions post={post} updatePosts={updatePosts}/>
          )}
        </section>

        {/* Main text/image body of post */}
        <section>
          <h3 className='px-4 py-2 break-words'>{post.text}</h3>
          {post.image && (
            <img src={post.image.imageUrl} alt={post.image.altText} className='w-full' />
          )}
        </section>

        {/* Section containing all likes/comments related buttons */}
        <section>
          <div className='flex items-center justify-between px-4 py-2'>
            <Button ariaLabel="Show likes" hasPopup="dialog" customStyles="text-sm text-gray-600 flex items-center justify-center hover:underline hover:decoration-gray-600 outline-plum-600 outline-offset-2" onClick={() => setShowLikesModal(true)}>
              <img src={like} alt="Love heart" className='w-4 mr-1 mb-px' />
              <span className='mt-px'>{post.numLikes + localLike}</span>
            </Button>
            <Button ariaLabel="Show comments" expanded={showComments} customStyles="text-sm text-gray-600 hover:underline hover:decoration-gray-600 outline-plum-600 outline-offset-2" onClick={() => {
              if (post.numComments > 0) { setShowComments(true) }
            }}>
              {/* Adjust the displayed number of comments to match the most up-to-date source numComments */}
              {(newCommentCount !== 1) ? `${newCommentCount} comments` : `1 comment`}
            </Button>
          </div>
          <div className={`flex items-center justify-evenly mx-4 border-t pt-1 ${showComments && 'border-b mb-6 py-1'}`}>
            <LikeBtn post={post} setLocalLike={setLocalLike} />
            <Button expanded={showComments} customStyles="flex items-middle justify-center text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-full outline-plum-600" onClick={() => setShowComments(true)}>
              <CommentIcon iconFill='#6b7280' iconStyles='w-6 mr-2' />
              Comment
            </Button>
          </div>
        </section>

        {/* Comments section */}
        {showComments && (
          <div>
            <PostCommentForm postId={post._id} updateComments={updateComments} />
            <Comments postId={post._id} updateCommentCount={setNewCommentCount} updateComments={updateComments} key={updateKey} />
          </div>
        )}
      </article>

      {showLikesModal && (<LikesModal postId={post._id} closeModal={() => setShowLikesModal(false)} />)}
    </>
  )
}

export default Post