import {useFetchGet} from '../hooks/useFetchGet';
import { useAuthContext } from '../hooks/useAuthContext';
import Post from './Post';
import Button from './utils/Button';
import StyledLink from './utils/StyledLink';

const Feed = () => {
  const { user } = useAuthContext();

  const { data: posts, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/feed`);

  return (
    <div className='max-w-3xl lg:min-w-full'>
      {posts && (
        <div>
          {posts.map((post) => (
            <Post post={post} key={post._id}/>
          ))}
        </div>
      )}
      <div className='flex flex-col items-center content-center rounded shadow-md bg-white px-4 py-8 mb-6 '>
        <p className='font-bold text-xl text-gray-600'>No more posts</p>
        <p className='text-md text-gray-600 mb-4'>Add more friends to see more posts in your Feed.</p>
        <StyledLink to="/" design="btn-primary" customStyles="w-40">Find Friends</StyledLink>
      </div>
    </div>
  )
}

export default Feed