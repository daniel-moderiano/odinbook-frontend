import SkeletonFriendCard from "./skeletons/SkeletonFriendCard"
import FriendCard from "./FriendCard"

const FriendRequestSection = ({ friends, loading, error, type }) => {
  return (
    <section className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
      <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2 lg:pt-8 lg:mt-8 lg:border-t lg:border-gray-300">Sent requests</h2>
      <div className="flex flex-wrap items-center justify-start">
        {friends && (
          <>
            {friends.outgoingRequests.length > 0 ? (
              <>
                {friends.outgoingRequests.map((request) => (
                  <FriendCard friendData={request.user} type="outgoing" key={request._id}/>
                ))}
              </>
            ) : (
              <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>No requests sent</p>
            )} 
          </> 
        )}

        {loading && (
          <>
            <SkeletonFriendCard />
            <SkeletonFriendCard />
            <SkeletonFriendCard />
          </>
        )}

        {error && (
          <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>Unable to load requests</p>
        )}
      </div>
    </section>
  )
}

export default FriendRequestSection