import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/slices/productSlice";

const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { isReviewDeleting, isPostingReview } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = () => {
    e.preventDefault();
    const data = new FormData();
    data.append("rating", rating);
    data.append("comment", comment);
    dispatch(postReview({ productId: product.id, review: data }));
  };

  return (
    <>
      {authUser && (
        <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
          <h4 className="text-lg font-semibold">Leave a Review</h4>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                >☆</button>
              );
            })}
          </div>

          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="write your review..."
            className="w-full p-3 rounded-md border-border bg-background text-foreground" />
            <button type="submit" disabled={isPostingReview} className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:glow-on-hover animate-smooth disabled:opacity-50">
              {
                isPostingReview ? "Submitting..." : "Submit Review"
              }
            </button>
        </form>
      )}
    </>
  );
};

export default ReviewsContainer;
