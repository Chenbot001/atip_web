import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  Quote, 
  Users, 
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAuthor, fetchAuthorPapers, fetchAuthorAuthorships } from '@/lib/api';

// Remove RadarChart import and component

const CoauthorNetwork = ({ coauthors }: { coauthors: Array<{author_id?: string | number; name: string; initials: string; papers: number; strength: number;}> }) => {
  const [hoveredAuthor, setHoveredAuthor] = useState<string | null>(null);
  
  return (
    <div className="relative h-64 bg-muted/20 rounded-lg flex items-center justify-center">
      <div className="relative">
        {/* Central author */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
            SC
          </div>
        </div>
        
        {/* Co-authors in circle */}
        {(coauthors || []).map((coauthor, i) => {
          const angle = (i * 2 * Math.PI) / (coauthors.length || 1);
          const radius = 80;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          return (
            <div key={coauthor.author_id || coauthor.name || i} className="absolute top-1/2 left-1/2" style={{ transform: `translate(${x - 20}px, ${y - 20}px)` }}>
              {/* Connection line */}
              <svg className="absolute top-5 left-5 pointer-events-none" style={{ width: Math.abs(x) + 20, height: Math.abs(y) + 20, zIndex: -1 }}>
                <line
                  x1={x > 0 ? 0 : Math.abs(x)}
                  y1={y > 0 ? 0 : Math.abs(y)}
                  x2={x > 0 ? Math.abs(x) : 0}
                  y2={y > 0 ? Math.abs(y) : 0}
                  stroke="hsl(var(--primary))"
                  strokeWidth={coauthor.strength}
                  opacity="0.6"
                />
              </svg>
              
              {/* Author node */}
              <div 
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-medium cursor-pointer hover:bg-accent/80 transition-colors"
                onMouseEnter={() => setHoveredAuthor(coauthor.name)}
                onMouseLeave={() => setHoveredAuthor(null)}
              >
                {coauthor.initials}
              </div>
              
              {/* Hover card */}
              {hoveredAuthor === coauthor.name && (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-popover border rounded-lg p-2 shadow-lg z-10 min-w-max">
                  <div className="text-sm font-medium">{coauthor.name}</div>
                  <div className="text-xs text-muted-foreground">{coauthor.papers} papers together</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'citations' | 'year' | 'venue'>('citations');
  const [profile, setProfile] = useState<any>(null);
  const [publications, setPublications] = useState<any[]>([]);
  const [coauthors, setCoauthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchAuthor(id),
      fetchAuthorPapers(id),
      fetchAuthorAuthorships(id),
    ])
      .then(([author, papers, coauthorships]) => {
        // Map backend fields to frontend expected fields
        const mappedProfile = {
          name: (author.first_name || '') + (author.last_name ? ' ' + author.last_name : ''),
          affiliation: author.affiliation || 'N/A',
          careerLength: author.career_length ?? 'N/A',
          totalPapers: author.publication_count ?? 'N/A',
          totalCitations: author.citations ?? 'N/A',
          hIndex: author.h_index ?? 'N/A',
          authorId: author.author_id,
          metrics: {
            ANCI: author.adj_anci_p_frac ?? 0,
            CAGR: author.cagr ?? 0,
            LTSD: author.ltsd ?? 0,
            PQI: author.pqi ?? 0,
            "First Author Dominance": author.first_author_dominance ?? 0,
          },
          // aiSummary: author.ai_summary ?? '', // Uncomment if/when available
        };
        setProfile(mappedProfile);
        setPublications(papers);
        setCoauthors(coauthorships);
      })
      .catch(() => setError('Error loading profile'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading profile...</p></div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Helper to safely get a field or 'N/A'
  const safe = (val: any) => (val === undefined || val === null || val === '' ? 'N/A' : val);
  const metrics = profile.metrics && Object.keys(profile.metrics).length > 0 ? profile.metrics : {
    ANCI: 'N/A',
    "ANCI (P)": 'N/A',
    "Adj. ANCI": 'N/A',
    "Adj. ANCI (P)": 'N/A',
    CAGR: 'N/A',
    LTSD: 'N/A',
    PQI: 'N/A',
    "First Author Dominance": 'N/A',
  };
  // const aiSummary = safe(profile.aiSummary); // Uncomment if/when available

  const sortedPublications = [...publications].sort((a, b) => {
    if (sortBy === 'citations') return (b.citation_count || 0) - (a.citation_count || 0);
    if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
    if (sortBy === 'venue') {
      const venueCompare = (a.venue || '').localeCompare(b.venue || '');
      if (venueCompare !== 0) return venueCompare;
      return (b.year || 0) - (a.year || 0); // Most recent first within same venue
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                  <span>{profile.affiliation}</span>
                  {profile.homepage && (
                    <a 
                      href={profile.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Homepage
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.careerLength}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.totalPapers} papers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Quote className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{typeof profile.totalCitations === 'number' ? profile.totalCitations.toLocaleString() : 'N/A'} citations</span>
                  </div>
                </div>

                {/* AI Summary Section - now with placeholder text */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-xs font-bold">AI</span>
                  </div>
                  <p className="text-sm leading-relaxed">AI-generated summary of author...</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link to={`/compare?researchers=${id}`}>
                    <Users className="h-4 w-4 mr-2" />
                    Compare Researcher
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Research Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display metrics as boxes in a grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="bg-accent/10 rounded-lg p-4 flex flex-col items-center justify-center border">
                    <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">{key}</div>
                    <div className="text-2xl font-bold text-primary">{typeof value === 'number' ? value : String(value) || 'N/A'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Co-author Network */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Collaboration Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CoauthorNetwork coauthors={coauthors || []} />
            </CardContent>
          </Card>
        </div>

        {/* Publications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Publications
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'citations' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('citations')}
                >
                  By Citations
                </Button>
                <Button
                  variant={sortBy === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('year')}
                >
                  By Year
                </Button>
                <Button
                  variant={sortBy === 'venue' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('venue')}
                >
                  By Venue
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedPublications.map((paper, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedPaper(expandedPaper === `${index}` ? null : `${index}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-2 flex items-center gap-2">
                          {paper.title}
                          {paper.isAwarded && <Award className="h-4 w-4 text-yellow-500" />}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline">{paper.venue}</Badge>
                          <span>{paper.year}</span>
                          <div className="flex items-center gap-1">
                            <Quote className="h-3 w-3" />
                            {typeof paper.citation_count === 'number' ? paper.citation_count.toLocaleString() : (paper.citation_count ? paper.citation_count : 'N/A') + ' citations'}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {expandedPaper === `${index}` ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {expandedPaper === `${index}` && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="mb-3">
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Authors:</h4>
                        <div className="flex flex-wrap gap-1">
                          {paper.authors.map((author, authorIndex) => (
                            <Badge 
                              key={authorIndex} 
                              variant={author === 'S. Chen' ? 'default' : 'secondary'}
                              className={author === 'S. Chen' ? 'bg-primary' : ''}
                            >
                              {author}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Abstract:</h4>
                        <p className="text-sm leading-relaxed">{paper.abstract}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;