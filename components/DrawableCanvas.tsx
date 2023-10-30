"use client";
import React, { useRef, useState, useEffect } from 'react';

interface DrawableCanvasProps {
  onNewImage?: (imgData: ImageData) => void;
}

const DrawableCanvas: React.FC<DrawableCanvasProps> = ({ onNewImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.fillStyle = '#000000'; // black color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const setPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setPos({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#FFFFFF'; // white color
        ctx.moveTo(pos.x, pos.y);
        setPosition(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000'; // black color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const getImgData = (): ImageData | null => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0, 28, 28);
        return ctx.getImageData(0, 0, 28, 28);
      }
    }
    return null;
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (onNewImage) {
      const imgData = getImgData();
      if (imgData) onNewImage(imgData);
    }
  };

  return (
    <div>
      <canvas data-testid="drawable-canvas" 
        ref={canvasRef}
        width={300}
        height={300}
        onMouseDown={(e) => {
          setIsDrawing(true);
          setPosition(e);
        }}
        onMouseMove={draw}
        onMouseUp={handleMouseUp}
        onMouseOut={() => setIsDrawing(false)}
      />
        <button className='erase-button' onClick={clearCanvas}>Erase</button>
    </div>
  );
};

export default DrawableCanvas;
