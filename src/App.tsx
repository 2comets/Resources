import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Play, Download, Volume2 } from 'lucide-react';
import { ResourceCard } from './components/ResourceCard';
import { ResourceCarousel } from './components/ResourceCarousel';
import { mockResources } from './data/mockResources';
import { Resource } from './types/Resource';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique languages and categories from all resources
  const languages = useMemo(() => {
    const langs = new Set(mockResources.flatMap(resource => resource.languages));
    return Array.from(langs).sort();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(mockResources.map(resource => resource.category));
    return Array.from(cats).sort();
  }, []);

  // Filter resources based on search term, language, and category
  const filteredResources = useMemo(() => {
    return mockResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLanguage = selectedLanguage === 'all' || resource.languages.includes(selectedLanguage);
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

      return matchesSearch && matchesLanguage && matchesCategory;
    });
  }, [searchTerm, selectedLanguage, selectedCategory]);

  // Group filtered resources by type
  const groupedResources = useMemo(() => {
    return {
      videos: filteredResources.filter(r => r.type === 'video'),
      audio: filteredResources.filter(r => r.type === 'audio'),
      pdfs: filteredResources.filter(r => r.type === 'pdf')
    };
  }, [filteredResources]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-violet-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Mental Health <span className="text-violet-600">Resources</span>
            </h1>
            {/* <p className="text-lg text-gray-600 max-w-2xl ">
              Discover curated videos, audio sessions, and educational materials to support your mental wellness journey
            </p> */}
          </div>

          {/* Search and Filters */}
          <div className="bg-violet-50 rounded-2xl p-6 border border-violet-200">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-violet-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Language Filter */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-white border border-violet-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 min-w-[140px]"
                >
                  <option value="all">All Languages</option>
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-violet-500">
                  <Filter className="h-4 w-4" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-violet-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 min-w-[140px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-violet-500">
                  <Filter className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedLanguage !== 'all' || selectedCategory !== 'all') && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-200 text-violet-800">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedLanguage !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-200 text-violet-800">
                    Language: {selectedLanguage}
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-200 text-violet-800">
                    Category: {selectedCategory}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Videos Section */}
        {groupedResources.videos.length > 0 && (
          <ResourceCarousel
            title="Video Resources"
            subtitle="Watch guided sessions, educational content, and therapeutic videos"
            resources={groupedResources.videos}
            accentColor="violet"
            icon={<Play className="h-6 w-6"/>}
          />
        )}

        {/* Audio Section */}
        {groupedResources.audio.length > 0 && (
          <ResourceCarousel
            title="Audio Resources"
            subtitle="Listen to meditation guides, podcasts, and calming soundscapes"
            resources={groupedResources.audio}
            icon={<Volume2 className="h-6 w-6" />}
            accentColor="purple"
          />
        )}

        {/* PDF Section */}
        {groupedResources.pdfs.length > 0 && (
          <ResourceCarousel
            title="PDF Resources"
            subtitle="Download worksheets, guides, and educational materials"
            resources={groupedResources.pdfs}
            icon={<Download className="h-6 w-6" />}
            accentColor="indigo"
          />
        )}

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-violet-200">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any resources matching your current filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLanguage('all');
                    setSelectedCategory('all');
                  }}
                  className="bg-violet-600 text-white px-6 py-2 rounded-xl hover:bg-violet-700 transition-colors duration-200 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {/* <footer className="bg-white border-t border-violet-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 Mental Health Resources. Supporting your wellness journey with professional, curated content.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-violet-600 hover:text-violet-800 text-sm font-medium">Privacy Policy</a>
              <a href="#" className="text-violet-600 hover:text-violet-800 text-sm font-medium">Terms of Service</a>
              <a href="#" className="text-violet-600 hover:text-violet-800 text-sm font-medium">Contact Support</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default App;