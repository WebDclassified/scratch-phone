import React from "react";
import { useDispatch } from "react-redux";
import { openScratch } from "../store/scratchSlice";
import type { AppDispatch } from "../store/store";

const FloatingScratchButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      className="floating-card"
      onClick={() => dispatch(openScratch())}
    >
      <div className="floating-card-content">
        🎁
      </div>
    </button>
  );
};

export default FloatingScratchButton;
