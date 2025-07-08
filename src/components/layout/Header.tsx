
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Moon, Sun, User, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ocean bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 ocean-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-ocean-primary">LocateYourHome</span>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/feed" className="text-ocean-secondary hover:text-ocean-primary transition-colors">
              Browse Rentals
            </Link>
            <Link to="/search" className="text-ocean-secondary hover:text-ocean-primary transition-colors">
              Search
            </Link>
            {user?.role === 'landlord' && (
              <Link to="/upload" className="text-ocean-secondary hover:text-ocean-primary transition-colors">
                Upload Rental
              </Link>
            )}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-ocean-secondary hover:text-ocean-primary"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-ocean-secondary hover:text-ocean-primary">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs ocean-primary text-white">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-ocean-secondary hover:text-ocean-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-ocean-muted">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  {user?.role === 'landlord' && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="ocean-primary hover:ocean-primary" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
