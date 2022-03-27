import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonPost = () => {
  return (
    <div className="mb-8 py-5 px-5 rounded bg-white relative overflow-hidden shadow-sm max-w-3xl w-screen">
      <div className="flex items-center justify-start">
        <SkeletonElement type="avatar"/>
        <div className="w-20 ml-4">
          <SkeletonElement type="text-sm"/>
          <SkeletonElement type="text-sm"/>
        </div>
      </div>
      <div>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonPost;