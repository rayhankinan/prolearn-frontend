import { useState } from "react";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    if (value !== null) {
      setRating(value);
    }
    console.log(value);
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
      <div className="bg-white rounded-md shadow-lg p-8 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Rate This Course</h2>
          <div className="flex items-center">
            <span className="ml-12"></span>
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
            sx={{ fontSize: "3rem" }}
            />
        </div>
        <div className="flex justify-end">
          <button
            className="inline-flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
