import { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/solid";
import { useAuth } from "../../context/AuthContext";

const Reviews = ({ productId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Great product! Exactly what I was looking for.",
      date: "2024-02-20",
    },
    // Add more reviews...
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      user: user.name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${
                star <= averageRating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium">
          {averageRating.toFixed(1)} out of 5
        </span>
        <span className="text-gray-500">({reviews.length} reviews)</span>
      </div>

      {user && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 bg-gray-50 p-4 rounded-lg"
          onSubmit={handleSubmitReview}
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <StarIcon
                    className={`h-6 w-6 ${
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full border rounded-md p-2"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Submit Review
          </button>
        </motion.form>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b pb-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{review.user}</p>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
