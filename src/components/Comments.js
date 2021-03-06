import { useEffect } from "react";
import { useFetchGet } from "../hooks/useFetchGet";
import Comment from "./Comment";
import SkeletonComment from './skeletons/SkeletonComment';
import { useErrorToast } from '../hooks/useErrorToast';

const Comments = ({ postId, updateCommentCount, updateComments }) => {
  const { data: comments, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/posts/${postId}/comments`);

  // Set up notifications. 
  useErrorToast(error, 'An error occurred while loading comments.');

  // When the number of comments changes, update the parent Post component of the most current number of comments
  useEffect(() => {
    if (comments) {
      updateCommentCount(comments.length);
    }
  }, [updateCommentCount, comments]);

  return (
    <section data-testid="comments" className="w-full mt-1">
      {comments && (    // Don't render the 'All comments' message unless there is one or more comments on a post
        <div>
          {comments.length > 0 && (
            <span className="text-sm text-gray-500 block mx-4 pb-0.5 pt-4">All comments</span>
          )}
          <div className="w-full px-4 pt-5">
            {comments.map((comment) => (
              <Comment key={comment._id} commentData={comment} postId={postId} updateComments={updateComments}/>
            ))}
          </div>
        </div>
      )}

      {loading && (   // render 4 skeleton comments
        <div data-testid="skeleton">
          {[0, 1, 2, 3].map((index) => (
            <SkeletonComment key={index}/>
          ))}
        </div>
      )}

      {error && (
        <div className="w-full text-center text-sm text-gray-500 px-4 py-5">
          Unable to load comments
        </div>
      )}
    </section>
  )
}

export default Comments