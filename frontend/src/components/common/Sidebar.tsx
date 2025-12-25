import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, MapPin, Heart, Briefcase, TrendingUp, Zap, Clock, Flame } from 'lucide-react';

const categories = [
  { name: 'World', icon: Globe, color: 'text-blue-600' },
  { name: 'India', icon: MapPin, color: 'text-orange-600' },
  { name: 'Sports', icon: TrendingUp, color: 'text-green-600' },
  { name: 'Technology', icon: Zap, color: 'text-purple-600' },
  { name: 'Health', icon: Heart, color: 'text-red-600' },
  { name: 'Jobs', icon: Briefcase, color: 'text-indigo-600' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Breaking News Section */}
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Flame className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wide">Breaking News</span>
        </div>
        <p className="text-xs leading-relaxed">
          Stay updated with the latest breaking news and developments from around the world.
        </p>
      </div>

      {/* Categories Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-red-600" />
          Latest News
        </h2>
        
        <nav className="space-y-1">
          {categories.map((category) => {
            const path = `/${category.name.toLowerCase()}-news`;
            const isActive = location.pathname === path;
            const Icon = category.icon;
            
            return (
              <Link
                key={category.name}
                to={path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Icon className={`h-5 w-5 ${
                  isActive ? 'text-white' : category.color
                } group-hover:scale-110 transition-transform`} />
                <span className="font-medium">{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Trending Topics */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          Trending Topics
        </h3>
        <div className="space-y-2">
          <div className="text-xs text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
            #ElectionUpdates
          </div>
          <div className="text-xs text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
            #ClimateChange
          </div>
          <div className="text-xs text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
            #TechInnovation
          </div>
          <div className="text-xs text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
            #SportsHighlights
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
