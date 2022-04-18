import FocusTrap from 'focus-trap-react';
import { Link } from 'react-router-dom';
import { useFetchGet } from '../hooks/useFetchGet';
import ProfilePic from './utils/ProfilePic';
import like from '../assets/like.png';
import { useModalEvents } from '../hooks/useModalEvents';
import SkeletonLike from './skeletons/SkeletonLike';
import CloseIcon from './icons/CloseIcon'

const LikesModal = ({ postId, commentId, closeModal }) => {
  // Amend the fetch URL if comment ID is present (i.e. fetching likes for comment instead of post)
  const { data: likes, loading, error } = useFetchGet(`http://localhost:3000/api/posts/${postId}/${commentId ? `comments/${commentId}/likes` : 'likes'}`);

  useModalEvents(closeModal);

  return (
    <FocusTrap>
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md p-5 flex flex-col items-start rounded shadow-md max-h-full overflow-auto'>

          <header className='flex flex-col justify-start items-start w-full border-b pb-2'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h4 id="modal-title" className='text-xl font-semibold'>Likes</h4>
              <button type="button" className='rounded-full p-1 hover:bg-gray-100 active:scale-0.95 outline-plum-600' aria-label="close current window" onClick={closeModal}>
                <CloseIcon iconStyles="w-6" iconFill="#1B1E22"/>
              </button>
            </div>

           {likes && (
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <img src={like} alt="Love heart" className='w-4 mr-1 mb-px' />
              <span className='mt-px'>{(likes.length !== 1) ? `${likes.length} likes` : `1 like`}</span>
            </div>
           )}

          </header>

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
                      <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="w-10 h-10 rounded-full"/>
                    </Link>
                    <Link to={`/profile/${user._id}`} className='text-sm font-semibold hover:underline outline-plum-600 outline-offset-2'>{user.fullName}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </FocusTrap>
  )
}

export default LikesModal;