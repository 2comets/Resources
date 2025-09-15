import React, { useState } from 'react';
import { Download, FileText, ExternalLink, Eye } from 'lucide-react';

interface PDFEmbedProps {
  pdfUrl?: string;
  downloadUrl?: string;
  title: string;
  thumbnail: string;
  accentColor: 'violet' | 'purple' | 'indigo';
}

export function PDFEmbed({ pdfUrl, downloadUrl, title, thumbnail, accentColor }: PDFEmbedProps) {
  const [showPreview, setShowPreview] = useState(false);

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

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  if (showPreview && pdfUrl) {
    return (
      <div className="relative group">
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-white border border-gray-200">
          <iframe
            src={pdfUrl}
            title={title}
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
        
        {/* Overlay controls */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleClosePreview}
            className="bg-black bg-opacity-60 text-white p-2 rounded-md hover:bg-opacity-80 transition-all duration-200"
            title="Close Preview"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer" onClick={handleDownload}>
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
        
        {/* Download button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${accentClasses.bg} ${accentClasses.hover} p-4 rounded-full shadow-lg group-hover:scale-110 transition-all duration-200`}>
            <Download className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="bg-white bg-opacity-90 text-gray-800 px-3 py-2 rounded-md hover:bg-opacity-100 transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          {pdfUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePreview();
              }}
              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
