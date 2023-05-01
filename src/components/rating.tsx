import { useState } from "react";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RatingService from "@/services/rating-service";
import { useRouter } from "next/router";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, courseId }) => {
  const [rating, setRating] = useState<number>(0);
  const router = useRouter();
  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    if (value !== null) {
      setRating(value);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await RatingService.create({ courseId, rating });
      onClose();
      router.push(`/course`);
    } catch (error) {
      console.error(error);
    }
  };

  const getRatingText = (value: number) => {
    switch (value) {
      case 0:
        return "Really Bad";
      case 1:
        return "Bad";
      case 2:
        return "Not Bad";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center"
      sx={{ backdropFilter: "blur(2px)"}}
    >
      <div className="bg-white rounded-md shadow-lg p-8 min-w-l max-w-xl mx-auto ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Rate This Course</h2>
          <div className="flex items-center">
            <IconButton onClick={onClose}>
              <CloseIcon className="text-gray-700" />
            </IconButton>
          </div>
        </div>
        <div className="flex items-center justify-center mb-8 mt-8">
          <Rating 
            name="rating" 
            value={rating} 
            onChange={handleRatingChange}
            sx={{ fontSize: "5rem" }}
          />
        </div>
        <div className="mb-4 text-center">
          <div className="mt-1">
            <span className="text-center font-bold">{rating > 0 && getRatingText(rating)}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="inline-flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleRatingSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
