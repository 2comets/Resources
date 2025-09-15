import { Clock, Star } from 'lucide-react';
import { Resource } from '../types/Resource';
import { VideoEmbed } from './VideoEmbed';
import { AudioEmbed } from './AudioEmbed';
import { PDFEmbed } from './PDFEmbed';

interface ResourceCardProps {
  resource: Resource;
  accentColor: 'violet' | 'purple' | 'indigo';
}

export function ResourceCard({ resource, accentColor }: ResourceCardProps) {

  const getAccentClasses = (color: string) => {
    const colorMap = {
      violet: {
        bg: 'bg-white-600',
        hover: 'hover:bg-violet-700',
        text: 'text-black',
        bgLight: 'bg-violet-50',
        border: 'border-violet-200'
      },
      purple: {
        bg: 'bg-white-600',
        hover: 'hover:bg-white-700',
        text: 'text-black',
        bgLight: 'bg-purple-50',
        border: 'border-purple-200'
      },
      indigo: {
        bg: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        text: 'text-black',
        bgLight: 'bg-indigo-50',
        border: 'border-indigo-200'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const accentClasses = getAccentClasses(accentColor);

  return (
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-violet-200 flex flex-col ${resource.type === 'video' ? 'h-80' : 'h-full'}`}>
      {/* Thumbnail/Embed */}
      <div className="relative overflow-hidden">
        {resource.type === 'video' && resource.embedUrl ? (
          <VideoEmbed
            embedUrl={resource.embedUrl}
            youtubeUrl={resource.youtubeUrl}
            title={resource.title}
            thumbnail={resource.thumbnail}
            accentColor={accentColor}
          />
        ) : resource.type === 'audio' && resource.audioUrl ? (
          <AudioEmbed
            audioUrl={resource.audioUrl}
            externalUrl={resource.audioExternalUrl}
            title={resource.title}
            thumbnail={resource.thumbnail}
            accentColor={accentColor}
          />
        ) : resource.type === 'pdf' && resource.pdfUrl ? (
          <PDFEmbed
            pdfUrl={resource.pdfUrl}
            downloadUrl={resource.pdfDownloadUrl}
            title={resource.title}
            thumbnail={resource.thumbnail}
            accentColor={accentColor}
          />
        ) : (
          <>
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
          </>
        )}
        
        {/* Type Badge */}
        {/* <div className={`absolute top-4 left-4 px-3 py-1 ${accentClasses.bg} text-white text-xs font-semibold rounded-full flex items-center space-x-1 z-10`}>
          {getIcon()}
          <span className="capitalize">{resource.type === 'video' || resource.type === 'au' ? '' : resource.type}</span>
        </div> */}

        {/* Duration */}
        <div className="absolute top-4 right-4 px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded-md flex items-center space-x-1 z-10">
          <Clock className="h-3 w-3" />
          <span>{resource.duration}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs rounded-md flex items-center space-x-1 z-10">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{resource.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors duration-200 overflow-hidden text-ellipsis whitespace-nowrap">
            {resource.title}
          </h3>
          {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {resource.description}
          </p> */}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 2).map((tag, index) => (
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
          {/* <div className="space-y-2 text-xs text-gray-500">
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
          </div> */}
        </div>

        {/* Action Button */}
        {/* <button 
          onClick={() => {
            if (resource.type === 'video' && resource.youtubeUrl) {
              window.open(resource.youtubeUrl, '_blank', 'noopener,noreferrer');
            } else if (resource.url) {
              window.open(resource.url, '_blank', 'noopener,noreferrer');
            }
          }}
          className={`w-full mt-3 ${accentClasses.bg} ${accentClasses.hover} text-white py-2 px-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-[1.02]`}
        >
          {getIcon()}
          <span>
            {resource.type === 'video' ? 'Watch on YouTube' :
             resource.type === 'audio' ? 'Listen Now' :
             'Download PDF'}
          </span>
        </button> */}
      </div>
    </div>
  );
}