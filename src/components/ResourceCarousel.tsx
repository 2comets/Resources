import React, { useState, useRef, useEffect } from 'react';
import { ResourceCard } from './ResourceCard';
import { Resource } from '../types/Resource';

interface ResourceCarouselProps {
  title: string;
  subtitle: string;
  resources: Resource[];
  icon: React.ReactNode;
  accentColor: 'violet' | 'purple' | 'indigo';
}

export function ResourceCarousel({ title, subtitle, resources, icon, accentColor }: ResourceCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(resources.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Mouse wheel event handler with debouncing
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!carouselRef.current?.contains(e.target as Node)) return;
      
      e.preventDefault();
      
      // Prevent multiple rapid scroll events
      if (isScrollingRef.current) return;
      
      isScrollingRef.current = true;
      
      if (e.deltaY > 0) {
        // Scroll down - next slide
        nextSlide();
      } else {
        // Scroll up - previous slide
        prevSlide();
      }
      
      // Reset the scroll lock after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800); // Slightly longer than transition duration
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [totalSlides]);

  const getAccentClasses = (color: string) => {
    const colorMap = {
      violet: {
        bg: 'bg-violet-600',
        hover: 'hover:bg-violet-700',
        text: 'text-violet-600',
        border: 'border-violet-200',
        bgLight: 'bg-violet-50'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-200',
        bgLight: 'bg-purple-50'
      },
      indigo: {
        bg: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        bgLight: 'bg-indigo-50'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const accentClasses = getAccentClasses(accentColor);

  if (resources.length === 0) return null;

  return (
    <section className="bg-transparent rounded-2xl overflow-hidden">
      <div className="p-0">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className={`p-3 ${accentClasses.bgLight} rounded-2xl ${accentClasses.text}`}>
              {icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-1">{subtitle}</p>
              {totalSlides > 1 && (
                <p className="text-xs text-gray-400 mt-1">💡 Scroll with mouse wheel to navigate</p>
              )}
            </div>
          </div>
          
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((resource) => (
                      <div key={resource.id} className="h-full">
                        <ResourceCard resource={resource} accentColor={accentColor} />
                      </div>
                    ))}
                  
                  {/* Fill empty slots to maintain layout */}
                  {resources.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length < itemsPerSlide &&
                    Array.from({ 
                      length: itemsPerSlide - resources.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length 
                    }, (_, emptyIndex) => (
                      <div key={`empty-${emptyIndex}`} className="h-full opacity-0 pointer-events-none">
                        <div className="bg-gray-100 rounded-2xl h-full min-h-[320px]"></div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? `${accentClasses.bg} scale-125`
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Resource Count */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {Math.min(currentSlide * itemsPerSlide + itemsPerSlide, resources.length)} of {resources.length} resources
          </p>
        </div>
      </div>
    </section>
  );
}