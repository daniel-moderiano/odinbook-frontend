import Button from './utils/Button';

const Post = () => {
  return (
    <article className="rounded shadow-sm border border-slate-200 bg-white">
      <div className='flex items-center justify-start'>
        <img src="" alt="Profile picture" />
        <div>
          <p className='font-bold'>Sam Smith</p>
          <p className='text-sm text-slate-500'>25 December 2022</p>
        </div>
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sint nulla a aut? Eveniet possimus saepe quis, accusantium earum fugit placeat quod tempora quos voluptates id, rem nostrum, magnam cupiditate.</p>
      </div>
      <div className='flex items-center justify-between'>
        <Button>12 likes</Button>
        <Button>10 comments</Button>
      </div>
      <div className='flex items-center justify-evenly'>
        <Button>Like</Button>
        <Button>Comment</Button>
      </div>
    </article>
  )
}

export default Post