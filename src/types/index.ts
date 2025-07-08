
export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  role: 'tenant' | 'landlord';
  phone?: string;
  preferences?: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  maxPrice?: number;
  preferredLocations?: string[];
  propertyTypes?: PropertyType[];
  amenities?: string[];
  notifications: {
    email: boolean;
    push: boolean;
    newListings: boolean;
    priceDrops: boolean;
  };
}

export interface RentalListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFootage?: number;
  amenities: string[];
  landlordId: string;
  landlordContact: {
    name: string;
    email: string;
    phone: string;
  };
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

export type PropertyType = 'apartment' | 'house' | 'condo' | 'townhouse' | 'studio' | 'room';

export interface SearchFilters {
  location?: string;
  maxPrice?: number;
  minPrice?: number;
  propertyTypes?: PropertyType[];
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'date-newest' | 'date-oldest';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'new-listing' | 'price-drop' | 'message' | 'system';
  read: boolean;
  createdAt: Date;
  relatedListingId?: string;
}
