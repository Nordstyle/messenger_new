import { useState, useEffect, MouseEventHandler } from "react";

export const useResize = (
  startWidth: number,
  minWidth = startWidth
): [number, MouseEventHandler<HTMLElement>] => {
  const [width, setWidth] = useState<number>(startWidth);

  useEffect(() => {
    setWidth(startWidth);
  }, [startWidth]);

  const handleMove: MouseEventHandler<HTMLElement> = (e) => {
    const start = e.clientX;
    const handleMove = (e: MouseEvent) => {
      const calculateSize = Math.max(minWidth, width - (e.clientX - start));
      setWidth(calculateSize);
    };
    const handleStop = () => {
      document.body.removeEventListener("mouseup", handleStop);
      document.body.removeEventListener("mousemove", handleMove);
    };
    document.body.addEventListener("mouseup", handleStop);
    document.body.addEventListener("mousemove", handleMove);
  };

  return [width, handleMove];
};
