import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonLike = () => {
  return (
    <div className="bg-white relative overflow-hidden max-w-3xl border-b border-gray-100">
      <div className="flex items-center justify-start pr-3">
        <div className="py-3">
          <SkeletonElement type="avatar-sm"/>
        </div>
        <div className="flex flex-col p-2 px-4 w-36">
          <SkeletonElement type="text"/>
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonLike;