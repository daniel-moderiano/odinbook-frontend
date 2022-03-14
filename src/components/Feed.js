import {useFetchGet} from '../hooks/useFetchGet';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const Feed = () => {
  const { user } = useAuthContext();

  const { data: posts, loading, error } = useFetchGet('http://localhost:3000/api/posts');

  return (
    <div>
      <h2>Feed</h2>
      {posts && (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <div>
              {post.text}
            </div>
            {post.image && (
              <img src={post.image.imageUrl} alt="" />
            )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Feed