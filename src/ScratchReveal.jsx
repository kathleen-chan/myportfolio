import { useRef, useEffect } from "react";

export default function ScratchReveal({ topImage, bottomImage, width = 400, height = 400 }) {
  const canvasRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const top = new Image();
    const bottom = new Image();
    bottomRef.current = bottom;

    bottom.src = bottomImage;
    top.src = topImage;

    top.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(top, 0, 0, width, height);
    };

    const scratch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    canvas.addEventListener("mousemove", scratch);

    return () => canvas.removeEventListener("mousemove", scratch);
  }, [topImage, bottomImage, width, height]);

  return (
    <div style={{ position: "relative", width, height }}>
      <img
        src={bottomImage}
        alt="bottom"
        style={{
          width,
          height,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}
