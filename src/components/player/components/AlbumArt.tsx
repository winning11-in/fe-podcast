import React from 'react';
import type { AudioTrack } from '../types';

interface AlbumArtProps {
  track: AudioTrack;
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ track }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "data:image/svg+xml," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#20B2AA"/>
          <circle cx="200" cy="150" r="60" fill="white" opacity="0.9"/>
          <polygon points="180,120 180,180 220,150" fill="#20B2AA"/>
        </svg>
      `);
  };

  return (
    <div className="album-art">
      <img
        src={track.thumbnail}
        alt={track.title}
        onError={handleImageError}
      />
    </div>
  );
};