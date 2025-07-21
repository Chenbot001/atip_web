import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  BarChart3, 
  Building2, 
  Users, 
  FileText, 
  Moon, 
  Sun, 
  Globe, 
  Share2,
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ATIP
            </span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>

            {/* Leaderboards Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-sm font-medium text-muted-foreground hover:text-primary">
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Leaderboards
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link to="/leaderboards?metric=anci">ANCI Leaders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leaderboards?metric=accel">Accel Leaders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leaderboards?metric=pqi">PQI Leaders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leaderboards">All Metrics</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Affiliations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-sm font-medium text-muted-foreground hover:text-primary">
                  <Building2 className="mr-1 h-4 w-4" />
                  Affiliations
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link to="/affiliations/stanford">Stanford University</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/affiliations/mit">MIT</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/affiliations/berkeley">UC Berkeley</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/affiliations">All Institutions</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/compare" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                isActive("/compare") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Users className="mr-1 h-4 w-4" />
              Compare
            </Link>

            <Link 
              to="/methodology" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                isActive("/methodology") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <FileText className="mr-1 h-4 w-4" />
              Methodology
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;