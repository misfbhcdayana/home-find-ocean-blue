
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Search, Upload, Home, Building, Users, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearchRentals = () => {
    navigate('/feed');
  };

  const handleUploadRental = () => {
    navigate('/upload');
  };

  const tenantActions = [
    {
      title: 'Browse Rentals',
      description: 'Explore available rental properties in your area',
      icon: Search,
      action: handleSearchRentals,
      color: 'ocean-primary',
    },
    {
      title: 'Saved Properties',
      description: 'View your saved and favorite rental listings',
      icon: Home,
      action: () => navigate('/saved'),
      color: 'ocean-secondary',
    },
  ];

  const landlordActions = [
    {
      title: 'Upload New Rental',
      description: 'List a new property for rent',
      icon: Upload,
      action: handleUploadRental,
      color: 'ocean-primary',
    },
    {
      title: 'Manage Properties',
      description: 'View and manage your rental listings',
      icon: Building,
      action: () => navigate('/manage'),
      color: 'ocean-secondary',
    },
    {
      title: 'Analytics Dashboard',
      description: 'View performance metrics and analytics',
      icon: BarChart3,
      action: () => navigate('/analytics'),
      color: 'ocean-accent',
    },
    {
      title: 'Tenant Inquiries',
      description: 'Manage tenant messages and applications',
      icon: Users,
      action: () => navigate('/inquiries'),
      color: 'secondary',
    },
  ];

  const actions = user?.role === 'landlord' ? landlordActions : tenantActions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ocean-primary mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-ocean-secondary text-lg">
            {user?.role === 'landlord' 
              ? 'Manage your properties and connect with potential tenants'
              : 'Find your perfect rental home'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="ocean-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ocean-muted">
                    {user?.role === 'landlord' ? 'Active Listings' : 'Saved Properties'}
                  </p>
                  <p className="text-2xl font-bold text-ocean-primary">12</p>
                </div>
                <Home className="h-8 w-8 text-ocean-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="ocean-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ocean-muted">
                    {user?.role === 'landlord' ? 'Total Views' : 'Applications Sent'}
                  </p>
                  <p className="text-2xl font-bold text-ocean-primary">248</p>
                </div>
                <BarChart3 className="h-8 w-8 text-ocean-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="ocean-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ocean-muted">
                    {user?.role === 'landlord' ? 'Inquiries' : 'Notifications'}
                  </p>
                  <p className="text-2xl font-bold text-ocean-primary">7</p>
                </div>
                <Users className="h-8 w-8 text-ocean-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actions.map((action, index) => (
            <Card key={index} className="ocean-shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full ocean-primary hover:ocean-primary">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="ocean-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { text: 'New rental inquiry received', time: '2 hours ago', type: 'message' },
                  { text: 'Property listing updated', time: '1 day ago', type: 'update' },
                  { text: 'New property saved to favorites', time: '3 days ago', type: 'save' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-ocean last:border-0">
                    <span className="text-ocean-secondary">{activity.text}</span>
                    <span className="text-sm text-ocean-muted">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
