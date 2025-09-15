import { useState } from 'react';
import { Play, Pause, Volume2, ExternalLink } from 'lucide-react';

interface AudioEmbedProps {
  audioUrl?: string;
  externalUrl?: string;
  title: string;
  thumbnail: string;
  accentColor: 'violet' | 'purple' | 'indigo';
}

export function AudioEmbed({ audioUrl, externalUrl, title, thumbnail, accentColor }: AudioEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

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
    setShowPlayer(true);
    setIsPlaying(true);
  };

  const handlePlayExternal = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setIsPlaying(false);
  };

  if (showPlayer) {
    return (
      <div className="relative group">
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="mb-6">
              <Volume2 className="h-16 w-16 mx-auto mb-4 text-white opacity-80" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-75">Audio Player</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`${accentClasses.bg} ${accentClasses.hover} p-4 rounded-full shadow-lg transition-all duration-200`}
              >
                {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white fill-white" />}
              </button>
            </div>

            {audioUrl && (
              <audio
                src={audioUrl}
                controls
                className="w-full max-w-md mx-auto"
                autoPlay={isPlaying}
              />
            )}
          </div>
        </div>
        
        {/* Overlay controls */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleClosePlayer}
            className="bg-black bg-opacity-60 text-white p-2 rounded-md hover:bg-opacity-80 transition-all duration-200"
            title="Close"
          >
            <ExternalLink className="h-4 w-4" />
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
          {externalUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayExternal();
              }}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              <span>External</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
