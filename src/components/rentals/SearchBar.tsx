
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Filter, DollarSign } from 'lucide-react';
import { SearchFilters } from '@/types';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    maxPrice: undefined,
    minPrice: undefined,
    propertyTypes: [],
    bedrooms: undefined,
    bathrooms: undefined,
    sortBy: 'date-newest'
  });

  const handleSearch = () => {
    const searchFilters = {
      ...filters,
      location: searchQuery
    };
    onSearch?.(searchFilters);
    console.log('Search triggered with:', searchFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="ocean-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Main Search Bar */}
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ocean-muted h-4 w-4" />
              <Input
                placeholder="Enter city, neighborhood, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 border-ocean"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="ocean-primary hover:ocean-primary px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-ocean"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ocean-primary">Min Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ocean-muted h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ocean-primary">Max Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ocean-muted h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="Any"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ocean-primary">Bedrooms</label>
                <select
                  value={filters.bedrooms || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full px-3 py-2 border border-ocean rounded-md bg-white dark:bg-slate-700"
                >
                  <option value="">Any</option>
                  <option value="0">Studio</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ocean-primary">Property Type</label>
                <select
                  onChange={(e) => {
                    const value = e.target.value as any;
                    setFilters(prev => ({ 
                      ...prev, 
                      propertyTypes: value ? [value] : [] 
                    }));
                  }}
                  className="w-full px-3 py-2 border border-ocean rounded-md bg-white dark:bg-slate-700"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
