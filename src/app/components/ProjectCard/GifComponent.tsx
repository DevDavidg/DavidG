import React, { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import './index.module.scss';

interface GifComponentProps {
  src: string;
  isHovered: boolean;
}

const GifComponent: React.FC<GifComponentProps> = ({ src, isHovered }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        const aspectRatio = img.width / img.height;
        const canvasWidth = 300;
        const canvasHeight = Math.round(canvasWidth / aspectRatio);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        setDimensions({ width: canvasWidth, height: canvasHeight });
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    };
  }, [src]);

  return (
    <div className={'gifContainer'}>
      <canvas
        ref={canvasRef}
        style={{
          display: isHovered || !isLoaded ? 'none' : 'block',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      />
      {isLoaded && (
        <NextImage
          src={src}
          width={dimensions.width}
          height={dimensions.height}
          className={isHovered ? 'colorGif' : ''}
          alt=""
          style={{
            display: isHovered && isLoaded ? 'block' : 'none',
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        />
      )}
    </div>
  );
};

export default GifComponent;
