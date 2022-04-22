// Used in skeleton loaders to add well... a shimmer effect! Must add to all skeleton loaders
const Shimmer = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full animate-[shimmer_1.5s_infinite]">
      <div className="w-6/12 h-full bg-white/30 skew-x-[-15deg] shadow-[0_0_30px_30px_rgb(255,255,255,0.1)]">
      </div>
    </div>
  )
}

export default Shimmer