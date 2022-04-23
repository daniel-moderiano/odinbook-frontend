import { Link } from 'react-router-dom';
import { useFetchGet } from '../../hooks/useFetchGet';
import ProfilePic from '../utils/ProfilePic';
import like from '../../assets/like.png';
import SkeletonLike from '../skeletons/SkeletonLike';
import ModalContainer from './ModalContainer';

// Simple modal that opens on click of number of likes on a post/comment, and displays all the users who have liked the post/comment
const LikesModal = ({ postId, commentId, closeModal }) => {
  // Amend the fetch URL if comment ID is present (i.e. fetching likes for comment instead of post)
  const { data: likes, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/posts/${postId}/${commentId ? `comments/${commentId}/likes` : 'likes'}`);

  return (
    <ModalContainer closeModal={closeModal} title="Likes" modalId="LikesModal">
      {/* Display the number of likes above the list of users */}
      {likes && (
        <div className="text-sm text-gray-600 flex items-center justify-start w-full border-b pb-2">
          <img src={like} alt="Love heart" className='w-4 mr-1 mb-px' />
          <span className='mt-px'>{(likes.length !== 1) ? `${likes.length} likes` : `1 like`}</span>
        </div>
      )}

      {/* Main body of modal */}
      <div className='w-full'>
        {loading && (
          <>
            <SkeletonLike />
            <SkeletonLike />
          </>
        )}

        {error && (
          <div className='p-3 bg-gray-100 my-1 text-gray-800 text-sm'>
            An error has occurred while loading likes.
          </div>
        )}

        {likes && (
          <ul>
            {likes.map((user) => (
              <li key={user._id} className='flex items-center justify-start border-b w-full py-2'>
                <Link to={`/profile/${user._id}`} className="hover:opacity-95 active:opacity-100 mr-4 outline-plum-600">
                  <ProfilePic image={user.profilePic && user.profilePic} styles="w-10 h-10 rounded-full" />
                </Link>
                <Link to={`/profile/${user._id}`} className='text-sm font-semibold hover:underline outline-plum-600 outline-offset-2'>{user.fullName}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ModalContainer>
  )
}

export default LikesModal;