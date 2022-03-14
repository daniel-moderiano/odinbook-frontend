import {useFetchGet} from '../hooks/useFetchGet';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';
import Post from './Post';

const Feed = () => {
  const { user } = useAuthContext();

  const { data: posts, loading, error } = useFetchGet('http://localhost:3000/api/posts');

  useEffect(() => {
    console.log(posts);
  }, [posts])

  return (
    <div>
      <h2>Feed</h2>
      {posts && (
        <div>
          {posts.map((post) => (
            <Post post={post}/>
          ))}
        </div>
      )}

    </div>
  )
}

export default Feed