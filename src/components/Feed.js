import { useFetchGet } from '../hooks/useFetchGet';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToastContext } from '../context/ToastContext';
import Post from './Post';
import StyledLink from './utils/StyledLink';
import SkeletonPost from './skeletons/SkeletonPost';
import { useEffect } from 'react';

const Feed = () => {
  const { user } = useAuthContext();
  const { data: posts, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/feed`);
  const { showToast } = useToastContext();

  // Display toast on error of loading feed
  useEffect(() => {
    if (error) {
      showToast('error', error.errMsg);
    }
  }, [error, showToast])

  return (
    <div className='w-full max-w-3xl lg:min-w-full'>
      {loading && (
        <div data-testid="skeleton">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <SkeletonPost key={index}/>
        ))}
        </div>
      )}

      {posts && (
        <>
          <div>
            {posts.map((post) => (
              <Post post={post} key={post._id}/>
            ))}
          </div>
          <div className='flex flex-col items-center content-center rounded shadow-sm bg-white px-4 py-8 mb-6 '>
            <p className='font-bold text-xl text-gray-600'>No more posts</p>
            <p className='text-md text-gray-600 mb-4'>Add more friends to see more posts in your Feed.</p>
            <StyledLink to="/" design="btn-primary" customStyles="w-40">Find Friends</StyledLink>
          </div>
        </>
      )}
      
    </div>
  )
}

export default Feed;