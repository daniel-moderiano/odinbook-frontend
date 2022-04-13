import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonFriendTile = () => {
  return (
    <div className="relative overflow-hidden">
      <SkeletonElement type="avatar-square"/>
      <Shimmer />
    </div>
  )
}

export default SkeletonFriendTile;