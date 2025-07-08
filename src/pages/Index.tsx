
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Upload, Shield, Users, MapPin, Star } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your perfect rental with our advanced search and filtering system.',
    },
    {
      icon: Upload,
      title: 'Easy Listing',
      description: 'Landlords can quickly upload and manage their rental properties.',
    },
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All listings are verified to ensure quality and authenticity.',
    },
    {
      icon: Users,
      title: 'Connect Directly',
      description: 'Connect directly with landlords and tenants without intermediaries.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Listings' },
    { number: '50K+', label: 'Happy Users' },
    { number: '25+', label: 'Cities Covered' },
    { number: '4.9', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-ocean-primary mb-6 leading-tight">
              Find Your Perfect
              <span className="text-ocean-secondary"> Rental Home</span>
            </h1>
            <p className="text-xl text-ocean-secondary mb-8 max-w-2xl mx-auto">
              Discover thousands of verified rental properties across the country. 
              Whether you're searching for your next home or listing a property, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="ocean-primary hover:ocean-primary text-lg px-8 py-4">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-ocean text-ocean-primary hover:ocean-primary hover:text-white text-lg px-8 py-4">
                <Link to="/feed">Browse Rentals</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-ocean-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-ocean-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-ocean-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ocean-secondary/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ocean-primary mb-4">
              Why Choose LocateYourHome?
            </h2>
            <p className="text-xl text-ocean-secondary max-w-2xl mx-auto">
              We make finding and listing rental properties simple, secure, and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="ocean-shadow hover:shadow-lg transition-shadow duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 ocean-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-ocean-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-ocean-secondary">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean-primary to-ocean-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who have found their perfect rental through LocateYourHome. 
            Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-ocean-primary hover:bg-gray-100">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-ocean-primary">
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 ocean-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="text-2xl font-bold">LocateYourHome</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted platform for finding and listing rental properties. 
                Connecting landlords and tenants nationwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/feed" className="hover:text-white transition-colors">Browse Rentals</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LocateYourHome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
