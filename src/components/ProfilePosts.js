import { useFetchGet } from "../hooks/useFetchGet";
import Post from "./Post";

const ProfilePosts = ({ profileUser, profileType }) => {
  const { data: posts, loading, error } = useFetchGet(`http://localhost:3000/api/users/${profileUser._id}/posts`);

  return (
    <div>
      <div className="bg-white px-4 pt-4 md:px-6 rounded">
        <h2 className="font-bold text-2xl border-b pb-4">Posts</h2>
      </div>
      <div className='max-w-3xl lg:min-w-full'>
        {posts && (
          <div>
            {posts.map((post) => (
              <Post post={post} key={post._id}/>
            ))}
          </div>
        )}
        <div className='flex flex-col items-center content-center rounded shadow-sm bg-white px-4 py-8'>
          <p className='font-semibold text-xl text-gray-600'>No more posts</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePosts