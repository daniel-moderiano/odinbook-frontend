import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonPost = () => {
  return (
    <div className="my-4 py-2 px-4 rounded bg-white relative overflow-hidden">
      <div>
        <SkeletonElement type="avatar"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonPost