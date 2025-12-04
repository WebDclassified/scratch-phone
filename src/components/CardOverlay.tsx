import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeScratch, revealPrize } from "../store/scratchSlice";
import type { RootState, AppDispatch } from "../store/store";

type CanvasEvent =
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

const ScratchCardOverlay: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, prize } = useSelector((state: RootState) => state.scratch);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";
  }, [isOpen]);

  const getPointerPos = (e: CanvasEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    let clientX: number;
    let clientY: number;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (e: CanvasEvent) => {
    if (!isDrawingRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { x, y } = getPointerPos(e);
    const radius = 18;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const startDrawing = (e: CanvasEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    scratch(e);
  };

  const endDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      dispatch(revealPrize());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="scratch-overlay">
      <div className="scratch-card-container">
        <button
          className="scratch-close-btn"
          onClick={() => dispatch(closeScratch())}
        >
          ✕
        </button>

        <h3 className="scratch-title">Scratch to reveal!</h3>

        <div className="scratch-area">
          <div className="scratch-prize">{prize}</div>

          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseDown={startDrawing}
            onMouseMove={scratch}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={scratch}
            onTouchEnd={endDrawing}
          />
        </div>

        <p className="scratch-hint">Drag your finger or mouse to scratch.</p>
      </div>
    </div>
  );
};

export default ScratchCardOverlay;
