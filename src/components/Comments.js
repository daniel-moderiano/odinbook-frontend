import { useFetchGet } from "../hooks/useFetchGet";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const { data: comments, loading, error } = useFetchGet(`http://localhost:3000/api/posts/${postId}/comments`);

  return (
    <section data-testid="comments">
      {loading && (
        <p>Loading...</p>
      )}
      {comments && (
        <div>
          {comments.map((comment) => (
            <Comment key={comment._id} commentData={comment} postId={postId}/>
          ))}
        </div>
      )}
    </section>
  )
}

export default Comments