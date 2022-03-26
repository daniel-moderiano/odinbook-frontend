import { useEffect } from "react";
import { useFetchGet } from "../hooks/useFetchGet";
import Comment from "./Comment";
import { useToastContext } from "../context/ToastContext";

const Comments = ({ postId }) => {
  const { data: comments, loading, error } = useFetchGet(`http://localhost:3000/api/posts/${postId}/comments`);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  return (
    <section data-testid="comments" className="w-full mt-1">
      <span className="text-sm text-gray-500 block mx-4 pb-0.5 pt-4">All comments</span>
      {/* Comment input here? */}
      {loading && (
        <p>Loading...</p>
      )}
      {comments && (
        <div className="w-full px-4 pt-4">
          {comments.map((comment) => (
            <Comment key={comment._id} commentData={comment} postId={postId}/>
          ))}
        </div>
      )}
    </section>
  )
}

export default Comments