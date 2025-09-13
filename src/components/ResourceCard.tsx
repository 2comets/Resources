import React from 'react';
import { Play, Download, Volume2, Clock, Star, ExternalLink } from 'lucide-react';
import { Resource } from '../types/Resource';

interface ResourceCardProps {
  resource: Resource;
  accentColor: 'violet' | 'purple' | 'indigo';
}

export function ResourceCard({ resource, accentColor }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Play className="h-5 w-5" />;
      case 'audio':
        return <Volume2 className="h-5 w-5" />;
      case 'pdf':
        return <Download className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getAccentClasses = (color: string) => {
    const colorMap = {
      violet: {
        bg: 'bg-violet-600',
        hover: 'hover:bg-violet-700',
        text: 'text-violet-600',
        bgLight: 'bg-violet-50',
        border: 'border-violet-200'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600',
        bgLight: 'bg-purple-50',
        border: 'border-purple-200'
      },
      indigo: {
        bg: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        text: 'text-indigo-600',
        bgLight: 'bg-indigo-50',
        border: 'border-indigo-200'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const accentClasses = getAccentClasses(accentColor);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-violet-200 h-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
        
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 ${accentClasses.bg} text-white text-xs font-semibold rounded-full flex items-center space-x-1`}>
          {getIcon()}
          <span className="capitalize">{resource.type}</span>
        </div>

        {/* Duration */}
        <div className="absolute top-4 right-4 px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded-md flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{resource.duration}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs rounded-md flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{resource.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors duration-200">
            {resource.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {resource.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 ${accentClasses.bgLight} ${accentClasses.text} text-xs rounded-md font-medium`}
              >
                #{tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                +{resource.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-medium text-gray-700">{resource.category}</span>
            </div>
            <div className="flex justify-between">
              <span>Languages:</span>
              <span className="font-medium text-gray-700">{resource.languages.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Difficulty:</span>
              <span className={`font-medium capitalize ${
                resource.difficulty === 'beginner' ? 'text-green-600' :
                resource.difficulty === 'intermediate' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {resource.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className={`w-full mt-6 ${accentClasses.bg} ${accentClasses.hover} text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-[1.02]`}>
          {getIcon()}
          <span>
            {resource.type === 'video' ? 'Watch Now' :
             resource.type === 'audio' ? 'Listen Now' :
             'Download PDF'}
          </span>
        </button>
      </div>
    </div>
  );
}