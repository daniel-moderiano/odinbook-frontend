import SkeletonFriendCard from "./skeletons/SkeletonFriendCard"

// Component that handles loading and error UI across all friends pages
const FriendsErrorLoading = ({ message, loading, error }) => {
  return (
    <>
      {loading && (
        <div className="flex flex-wrap items-center justify-start">
          <SkeletonFriendCard />
          <SkeletonFriendCard />
          <SkeletonFriendCard />
        </div>
      )}

      {error && (
        <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>{message}</p>
      )}
    </>
  )
}

export default FriendsErrorLoading