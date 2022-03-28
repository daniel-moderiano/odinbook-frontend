import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonComment = () => {
  return (
    <div className="mb-2 py-5 px-4 rounded bg-white relative overflow-hidden max-w-3xl">
      <div className="flex items-start justify-start pr-3">
        <div className="mr-2">
          <SkeletonElement type="avatar-sm"/>
        </div>
        <div className="flex flex-col p-2 px-4 rounded border-gray-100 border w-full">
          <SkeletonElement type="text-sm"/>
          <SkeletonElement type="text-sm"/>
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonComment;