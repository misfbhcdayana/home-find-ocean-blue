import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Home, Building } from 'lucide-react';
import { apiFetch } from "@/lib/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant' as 'tenant' | 'landlord',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      toast({
        title: "Account created!",
        description: "Welcome to LocateYourHome. Let's get started!",
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md ocean-shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 ocean-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
          <CardDescription className="text-center">
            Join LocateYourHome and find your perfect rental
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="border-ocean"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="border-ocean"
              />
            </div>

            <div className="space-y-2">
              <Label>I am a</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange('role', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2 p-3 border border-ocean rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer">
                  <RadioGroupItem value="tenant" id="tenant" />
                  <Label htmlFor="tenant" className="flex items-center space-x-2 cursor-pointer">
                    <Home className="h-4 w-4 text-ocean-primary" />
                    <span>Tenant</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-ocean rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer">
                  <RadioGroupItem value="landlord" id="landlord" />
                  <Label htmlFor="landlord" className="flex items-center space-x-2 cursor-pointer">
                    <Building className="h-4 w-4 text-ocean-primary" />
                    <span>Landlord</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="border-ocean pr-10"
                />
                <Button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 text-ocean-muted hover:text-ocean-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                className="border-ocean"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full ocean-primary hover:ocean-primary"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            
            <p className="text-center text-sm text-ocean-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-ocean-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
        {error && <div className="text-center text-sm text-red-500 mt-4">{error}</div>}
        {success && <div className="text-center text-sm text-green-500 mt-4">{success}</div>}
      </Card>
    </div>
  );
};

export default Signup;
