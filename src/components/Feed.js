import {useFetchGet} from '../hooks/useFetchGet';
import { useAuthContext } from '../hooks/useAuthContext';
import Post from './Post';
import Button from './utils/Button';

const Feed = () => {
  const { user } = useAuthContext();

  const { data: posts, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/feed`);

  return (
    <div className='max-w-2xl'>
      {posts && (
        <div>
          {posts.map((post) => (
            <Post post={post} key={post._id}/>
          ))}
        </div>
      )}
      <div className='flex flex-col items-center content-center rounded shadow-md bg-white'>
        <p className='font-bold text-lg text-slate-800'>No more posts</p>
        <p className='text-md text-slate-700'>Add more friends to see more posts in your Feed.</p>
        <Button design="primary" customStyles="w-40">Find Friends</Button>
      </div>
    </div>
  )
}

export default Feed