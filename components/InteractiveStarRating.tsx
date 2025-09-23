import { Star } from "lucide-react"

export const InteractiveStarRating = ({
  rating,
  onRatingChange,
}: {
  rating: number
  onRatingChange: (rating: number) => void
}) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => onRatingChange(star)}
        className="focus:outline-none"
      >
        <Star
          className={`w-6 h-6 transition-colors ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-200"
          }`}
        />
      </button>
    ))}
  </div>
)
