import { useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import Spinner from '../Loading';
import { remToPx } from '@/app/services/functions';
import { GifComponentProps } from '@/app/services/models';

const GifComponent: React.FC<GifComponentProps> = ({
  src,
  isHovered,
  theme,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVideo = src.endsWith('.gifv') || src.endsWith('.mp4');
  const fileSrc = isVideo ? src.replace('.gifv', '.mp4') : src;

  useEffect(() => {
    const processMedia = (media: HTMLImageElement | HTMLVideoElement) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx && media.width > 0 && media.height > 0) {
        const aspectRatio = media.width / media.height;
        const canvasWidth = Math.round(300);
        const canvasHeight = Math.round(canvasWidth / aspectRatio);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        setDimensions({
          width: canvasWidth,
          height: canvasHeight,
        });
        ctx.drawImage(media, 0, 0, canvasWidth, canvasHeight);
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
      setLoading(false);
      setIsLoaded(true);
    };

    if (isVideo) {
      const video = videoRef.current;
      if (video) {
        video.onloadedmetadata = () => processMedia(video);
        video.src = fileSrc;
        video.load();
      }
    } else {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => processMedia(img);
      img.src = fileSrc;
    }
  }, [fileSrc, isVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isLoaded) {
      if (isHovered) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isHovered, isLoaded]);

  return (
    <div
      className={'gifContainer'}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }}
    >
      <Spinner
        loading={loading}
        background
        bgWidth="18.75rem"
        bgHeight="9.5rem"
        borderWidth={4}
        theme={theme}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: isHovered || !isLoaded || isVideo ? 'none' : 'block',
          width: remToPx(18.75),
          height: remToPx(9.5),
        }}
      />
      {isVideo && (
        <video
          ref={videoRef}
          loop
          muted
          style={{
            display: isLoaded ? 'block' : 'none',
            width: remToPx(18.75),
            height: remToPx(9.5),
            filter: isHovered ? 'none' : 'grayscale(100%)',
            objectFit: 'cover',
          }}
        />
      )}
      {!isVideo && isLoaded && (
        <NextImage
          src={fileSrc}
          width={dimensions.width}
          height={dimensions.height}
          className={isHovered ? 'colorGif' : ''}
          alt=""
          style={{
            display: isHovered && isLoaded ? 'block' : 'none',
            width: '18.75rem',
            height: '9.5rem',
          }}
        />
      )}
    </div>
  );
};

export default GifComponent;
