import Button from './utils/Button';
import profilePicBlank from '../assets/profile-pic-blank.webp';

const Post = ({ post }) => {
  const customiseCommentText = (numComments) => {
    if (numComments === 0) {
      return 'No comments';
    }

    if (numComments === 1) {    // remove plural
      return '1 comment';
    }

    // No adjustment necessary, return typical 'x comments' format
    return `${numComments} comments`
  };

  const customiseLikeText = (numLikes) => {
    if (numLikes === 0) {
      return 'No likes';
    }

    if (numLikes === 1) {    // remove plural
      return '1 like';
    }

    // No adjustment necessary, return typical 'x likes' format
    return `${numLikes} likes`
  };

  return (
    <article className="rounded shadow-sm border border-slate-200 bg-white my-6">
      <div className='flex items-center justify-start'>
        {post.user.profilePic ? (
          <img src={post.user.profilePic.imageUrl} alt="Profile picture" className='w-5' />
        ) : (
          <img src={profilePicBlank} alt="Blank Profile picture" className='w-10 mr-4 rounded-full'/>
        )}
        <div>
          <p className='font-bold'>{post.user.fullName}</p>
          <p className='text-sm text-slate-500'>25 December 2022</p>
        </div>
      </div>
      <div>
        <p>{post.text}</p>
        {post.image && (
          <img src={post.image.imageUrl} alt="" className='w-5' />
        )}
      </div>
      <div className='flex items-center justify-between'>
        <Button>{customiseLikeText(post.likes.length)} likes</Button>
        <Button>{customiseCommentText(post.comments.length)} comments</Button>
      </div>
      <div className='flex items-center justify-evenly'>
        <Button>Like</Button>
        <Button>Comment</Button>
      </div>
    </article>
  )
}

export default Post