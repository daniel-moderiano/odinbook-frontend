import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonFriendCard = () => {
  return (
    <div className="shadow-sm flex lg:flex-col bg-white w-full px-3 border-t lg:rounded lg:w-52 lg:m-4 lg:items-center lg:justify-center lg:p-0 lg:shadow-sm lg:border-none relative overflow-hidden">
      <div className="flex items-center w-full lg:flex-col">
        <SkeletonElement type="avatar-full"/>
        <div className="ml-8 lg:m-0 lg:p-4 w-48 flex flex-col">
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonFriendCard;