import { useFetchGet } from '../hooks/useFetchGet';
import { useAuthContext } from '../hooks/useAuthContext';
import Post from './Post';
import StyledLink from './utils/StyledLink';
import SkeletonPost from './skeletons/SkeletonPost';
import { useErrorToast } from '../hooks/useErrorToast';

const Feed = ({ updateFeed }) => {
  const { user } = useAuthContext();
  const { data: posts, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/feed`);

  // Set up notifications 
  // ! Consider removing this to avoid doubling on error UI. Alternatively keep this but remove the error UI below
  useErrorToast(error, 'An error occurred while loading feed.');

  return (
    <div className='md:w-auto lg:min-w-full w-screen max-w-full'>      
      {loading && (
        <div data-testid="skeleton">
          {/* Render 10 skeleton posts */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <SkeletonPost key={index}/>
          ))}
        </div>
      )}

      {posts && (
        <>
          <div>
            {posts.map((post) => (
              <Post post={post} key={post._id} updateFeed={updateFeed}/>
            ))}
          </div>
          <div className='flex flex-col items-center content-center rounded shadow-sm bg-white px-4 py-8 mb-6'>
            <p className='font-bold text-xl text-gray-600'>No more posts</p>
            <p className='text-md text-gray-600 mb-4'>Add more friends to see more posts in your Feed.</p>
            <StyledLink to="/" design="btn-primary" customStyles="w-40">Find Friends</StyledLink>
          </div>
        </>
      )}

      {error && (
        <p className='mt-4 text-center w-full text-plum-600 text-lg font-semibold'>Unable to load Feed</p>
      )}
    </div>
  )
}

export default Feed;