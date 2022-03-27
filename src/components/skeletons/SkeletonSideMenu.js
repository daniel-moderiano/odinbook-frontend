import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonSideMenu = () => {
  return (
    <div className="mb-8 py-5 px-5 rounded bg-white relative overflow-hidden shadow-sm w-[350px]">
      <div className="flex flex-col items-center justify-center">
        <SkeletonElement type="avatar-lg"/>
        <div className="w-20 mb-3">
          <SkeletonElement type="text-sm"/>
          <SkeletonElement type="text-sm"/>
        </div>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonSideMenu;