
import React from 'react';
import { RentalListing } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, Share2, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RentalCardProps {
  listing: RentalListing;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  saved?: boolean;
}

const RentalCard: React.FC<RentalCardProps> = ({ listing, onSave, onShare, saved }) => {
  return (
    <Card className="ocean-shadow hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={listing.images[0] || '/api/placeholder/400/300'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Featured Badge */}
        {listing.featured && (
          <Badge className="absolute top-3 left-3 ocean-accent text-white">
            Featured
          </Badge>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onSave?.(listing.id);
            }}
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onShare?.(listing.id);
            }}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-ocean-primary">
            ${listing.price.toLocaleString()}/mo
          </span>
          <Badge variant="outline" className="border-ocean text-ocean-primary">
            {listing.propertyType}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 text-ocean-primary line-clamp-1">
          {listing.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-ocean-secondary mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">
            {listing.location.address}, {listing.location.city}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-4 text-ocean-muted">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{listing.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{listing.bathrooms} bath</span>
          </div>
          {listing.squareFootage && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.squareFootage} sq ft</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {listing.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{listing.amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button asChild className="w-full ocean-primary hover:ocean-primary">
          <Link to={`/rentals/${listing.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RentalCard;
