import React, { useState, useEffect, useRef } from 'react';
import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Researcher {
  id: string;
  name: string;
  affiliation: string;
}

// Sample researcher data for autocomplete
const sampleResearchers: Researcher[] = [
  { id: 'sarah-chen', name: 'Dr. Sarah Chen', affiliation: 'Stanford University' },
  { id: 'michael-rodriguez', name: 'Prof. Michael Rodriguez', affiliation: 'MIT' },
  { id: 'emily-watson', name: 'Dr. Emily Watson', affiliation: 'UC Berkeley' },
  { id: 'james-liu', name: 'Dr. James Liu', affiliation: 'Carnegie Mellon' },
  { id: 'anna-kowalski', name: 'Prof. Anna Kowalski', affiliation: 'Harvard University' },
  { id: 'sarah-johnson', name: 'Dr. Sarah Johnson', affiliation: 'Google Research' },
  { id: 'sarah-williams', name: 'Prof. Sarah Williams', affiliation: 'Oxford University' },
];

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "See what our AI thinks of a researcher...", 
  className 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Researcher[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = sampleResearchers.filter(researcher =>
        researcher.name.toLowerCase().includes(query.toLowerCase()) ||
        researcher.affiliation.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        } else if (suggestions.length > 0) {
          handleSelect(suggestions[0]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (researcher: Researcher) => {
    setQuery(researcher.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    navigate(`/profile/${researcher.id}`);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      inputRef.current &&
      suggestionsRef.current &&
      !inputRef.current.contains(e.target as Node) &&
      !suggestionsRef.current.contains(e.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 py-2 shadow-lg border-2 z-50 bg-background"
        >
          {suggestions.map((researcher, index) => (
            <div
              key={researcher.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                index === selectedIndex 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-muted/50"
              )}
              onClick={() => handleSelect(researcher)}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{researcher.name}</div>
                <div className="text-xs text-muted-foreground">{researcher.affiliation}</div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;