import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonFriendTileLarge = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-start lg:flex-row lg:rounded lg:border lg:border-gray-200 lg:p-2 lg:w-[415px]">
        <SkeletonElement type="avatar-square"/>
        <div className="lg:ml-4 lg:w-48">
          <SkeletonElement type="text-sm"/>
          <SkeletonElement type="text-sm"/>
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonFriendTileLarge;