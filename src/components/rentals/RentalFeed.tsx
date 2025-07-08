
import React, { useState, useEffect } from 'react';
import { RentalListing } from '@/types';
import RentalCard from './RentalCard';
import SearchBar from './SearchBar';
import { Button } from '@/components/ui/button';
import { Filter, Grid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockListings: RentalListing[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown with amazing city views.',
    price: 2500,
    location: {
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    images: ['/api/placeholder/600/400'],
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    amenities: ['Pool', 'Gym', 'Parking', 'Pet Friendly'],
    landlordId: '1',
    landlordContact: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-0123'
    },
    isActive: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 245
  },
  {
    id: '2',
    title: 'Cozy Studio Near University',
    description: 'Perfect studio apartment for students or young professionals.',
    price: 1800,
    location: {
      address: '456 College Ave',
      city: 'Berkeley',
      state: 'CA',
      zipCode: '94704',
      coordinates: { lat: 37.8715, lng: -122.2730 }
    },
    images: ['/api/placeholder/600/400'],
    propertyType: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    squareFootage: 500,
    amenities: ['WiFi', 'Laundry', 'Close to Transit'],
    landlordId: '2',
    landlordContact: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '555-0456'
    },
    isActive: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 123
  },
  {
    id: '3',
    title: 'Spacious Family House',
    description: 'Large family home with backyard in quiet neighborhood.',
    price: 4200,
    location: {
      address: '789 Oak Street',
      city: 'Palo Alto',
      state: 'CA',
      zipCode: '94301',
      coordinates: { lat: 37.4419, lng: -122.1430 }
    },
    images: ['/api/placeholder/600/400'],
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2400,
    amenities: ['Garage', 'Garden', 'Fireplace', 'Central AC'],
    landlordId: '3',
    landlordContact: {
      name: 'Mike Davis',
      email: 'mike@example.com',
      phone: '555-0789'
    },
    isActive: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 89
  }
];

const RentalFeed = () => {
  const [listings, setListings] = useState<RentalListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedListings, setSavedListings] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchListings = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setListings(mockListings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  const handleSave = (id: string) => {
    const newSavedListings = new Set(savedListings);
    if (savedListings.has(id)) {
      newSavedListings.delete(id);
      toast({
        title: "Removed from saved",
        description: "Property removed from your saved list.",
      });
    } else {
      newSavedListings.add(id);
      toast({
        title: "Saved!",
        description: "Property added to your saved list.",
      });
    }
    setSavedListings(newSavedListings);
  };

  const handleShare = (id: string) => {
    const listing = listings.find(l => l.id === id);
    if (listing) {
      navigator.clipboard.writeText(`${window.location.origin}/rentals/${id}`);
      toast({
        title: "Link copied!",
        description: "Property link copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-white rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ocean-primary mb-2">
            Available Rentals
          </h1>
          <p className="text-ocean-secondary">
            Discover your perfect home from {listings.length} available properties
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-ocean">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'ocean-primary' : 'border-ocean'}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'ocean-primary' : 'border-ocean'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {listings.map((listing) => (
            <RentalCard
              key={listing.id}
              listing={listing}
              onSave={handleSave}
              onShare={handleShare}
              saved={savedListings.has(listing.id)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-ocean text-ocean-primary hover:ocean-primary hover:text-white">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentalFeed;
