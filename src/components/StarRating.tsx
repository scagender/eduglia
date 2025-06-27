
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

const StarRating = ({ rating, maxRating = 5, size = "md", showNumber = true }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              index < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : index < rating
                ? "fill-yellow-200 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
