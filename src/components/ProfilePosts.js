import { useFetchGet } from "../hooks/useFetchGet";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import { useErrorToast } from "../hooks/useErrorToast";
import SkeletonPost from './skeletons/SkeletonPost';

const ProfilePosts = ({ profileUser, profileType }) => {
  const { data: posts, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users/${profileUser._id}/posts`);
  let navigate = useNavigate();

  // Set up notifications
  useErrorToast(error, 'An error occurred while loading posts.');

  return (
    <div>
      <div className="bg-white p-4 md:px-6 rounded shadow-sm mb-6">
        <h2 className="font-bold text-2xl">Posts</h2>
      </div>

      {/* Only visible on own profile */}
      {profileType === 'ownProfile' && (
        <CreatePost updatePosts={() => {
          navigate(`/profile/${profileUser._id}`, { state: 'update' });
        }}/>
      )}

      {/* Main posts 'feed' */}
      <div className='max-w-3xl lg:min-w-full'>
        {loading && (   // Render 4 skeleton posts
          <div data-testid="skeleton">
            {[1, 2, 3, 4].map((index) => (
              <SkeletonPost key={index}/>
            ))}
          </div>
        )}

        {posts && (
          <>
            <div>
              {posts.map((post) => (
                <Post post={post} key={post._id} updatePosts={() => {
                  navigate(`/profile/${profileUser._id}`, { state: 'update' });
                }}/>
              ))}
            </div>
            <div className='flex flex-col items-center content-center rounded shadow-sm bg-white px-4 py-8'>
              <p className='font-semibold text-xl text-gray-600'>No more posts</p>
            </div>
          </>
        )}

        {error && (
          <p className='mt-4 text-center w-full text-plum-600 text-lg font-semibold'>Unable to load posts</p>
        )}
      </div>
    </div>
  )
}

export default ProfilePosts;