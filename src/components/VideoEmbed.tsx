import React, { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';

interface VideoEmbedProps {
  embedUrl: string;
  youtubeUrl?: string;
  title: string;
  thumbnail: string;
  accentColor: 'violet' | 'purple' | 'indigo';
}

export function VideoEmbed({ embedUrl, youtubeUrl, title, thumbnail, accentColor }: VideoEmbedProps) {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const getAccentClasses = (color: string) => {
    const colorMap = {
      violet: {
        bg: 'bg-violet-600',
        hover: 'hover:bg-violet-700',
        text: 'text-violet-600',
        border: 'border-violet-200'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      indigo: {
        bg: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        text: 'text-indigo-600',
        border: 'border-indigo-200'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const accentClasses = getAccentClasses(accentColor);

  const handlePlayEmbedded = () => {
    setIsEmbedded(true);
  };

  const handlePlayOnYouTube = () => {
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseEmbedded = () => {
    setIsEmbedded(false);
  };

  const handleFullscreen = () => {
    setShowFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };

  if (showFullscreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl">
          <button
            onClick={handleCloseFullscreen}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }

  if (isEmbedded) {
    return (
      <div className="relative group">
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Overlay controls */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleFullscreen}
            className="bg-black bg-opacity-60 text-white p-2 rounded-md hover:bg-opacity-80 transition-all duration-200"
            title="Fullscreen"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            onClick={handleCloseEmbedded}
            className="bg-black bg-opacity-60 text-white p-2 rounded-md hover:bg-opacity-80 transition-all duration-200"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer" onClick={handlePlayEmbedded}>
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${accentClasses.bg} ${accentClasses.hover} p-4 rounded-full shadow-lg group-hover:scale-110 transition-all duration-200`}>
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayEmbedded();
            }}
            className="bg-white bg-opacity-90 text-gray-800 px-3 py-2 rounded-md hover:bg-opacity-100 transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
          >
            <Play className="h-4 w-4" />
            <span>Play Here</span>
          </button>
          {youtubeUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayOnYouTube();
              }}
              className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              <span>YouTube</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
