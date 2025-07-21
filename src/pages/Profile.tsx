import React, { useState } from 'react';
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

// Sample profile data
const profileData = {
  'sarah-chen': {
    name: 'Dr. Sarah Chen',
    affiliation: 'Stanford University',
    homepage: 'https://cs.stanford.edu/~schen',
    careerLength: '12 years',
    totalPapers: 127,
    totalCitations: 15420,
    hIndex: 42,
    aiSummary: "Dr. Sarah Chen is a pioneering researcher in machine learning and artificial intelligence. Her work focuses on neural network architectures and their applications in computer vision. She's known for groundbreaking contributions to deep learning optimization and has mentored numerous successful PhD students.",
    metrics: {
      impact: 95,
      productivity: 88,
      quality: 92,
      momentum: 85,
      collaboration: 90,
      influence: 94
    },
    coauthors: [
      { name: 'M. Rodriguez', initials: 'MR', papers: 23, strength: 5 },
      { name: 'A. Johnson', initials: 'AJ', papers: 18, strength: 4 },
      { name: 'K. Zhang', initials: 'KZ', papers: 15, strength: 3 },
      { name: 'D. Smith', initials: 'DS', papers: 12, strength: 3 },
      { name: 'L. Wang', initials: 'LW', papers: 10, strength: 2 }
    ],
    publications: [
      {
        title: 'Transformer Networks for Computer Vision: A Comprehensive Survey',
        venue: 'Nature Machine Intelligence',
        year: 2023,
        citations: 1245,
        authors: ['S. Chen', 'M. Rodriguez', 'A. Johnson'],
        abstract: 'This comprehensive survey examines the application of transformer architectures in computer vision tasks, providing insights into current trends and future directions.',
        isAwarded: true
      },
      {
        title: 'Efficient Neural Architecture Search with Progressive Optimization',
        venue: 'ICML',
        year: 2023,
        citations: 892,
        authors: ['S. Chen', 'K. Zhang'],
        abstract: 'We propose a novel approach to neural architecture search that reduces computational overhead while maintaining high performance across various tasks.',
        isAwarded: false
      },
      {
        title: 'Federated Learning with Differential Privacy Guarantees',
        venue: 'ICLR',
        year: 2022,
        citations: 2134,
        authors: ['S. Chen', 'D. Smith', 'L. Wang', 'P. Kumar'],
        abstract: 'This work presents a framework for federated learning that ensures strong differential privacy guarantees without significant performance degradation.',
        isAwarded: true
      }
    ]
  }
};

const RadarChart = ({ metrics }: { metrics: Record<string, number> }) => {
  const size = 200;
  const center = size / 2;
  const maxRadius = size / 2 - 20;
  
  const angles = Object.keys(metrics).map((_, i) => (i * 2 * Math.PI) / Object.keys(metrics).length - Math.PI / 2);
  
  const points = Object.values(metrics).map((value, i) => {
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angles[i]);
    const y = center + radius * Math.sin(angles[i]);
    return { x, y, value };
  });

  const pathData = points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((percent) => (
          <circle
            key={percent}
            cx={center}
            cy={center}
            r={(percent / 100) * maxRadius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Grid lines */}
        {angles.map((angle, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + maxRadius * Math.cos(angle)}
            y2={center + maxRadius * Math.sin(angle)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Data area */}
        <path
          d={pathData}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
          />
        ))}
        
        {/* Labels */}
        {Object.keys(metrics).map((label, i) => {
          const labelRadius = maxRadius + 15;
          const x = center + labelRadius * Math.cos(angles[i]);
          const y = center + labelRadius * Math.sin(angles[i]);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="hsl(var(--foreground))"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const CoauthorNetwork = ({ coauthors }: { coauthors: Array<{name: string, initials: string, papers: number, strength: number}> }) => {
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
        {coauthors.map((coauthor, i) => {
          const angle = (i * 2 * Math.PI) / coauthors.length;
          const radius = 80;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          return (
            <div key={coauthor.name} className="absolute top-1/2 left-1/2" style={{ transform: `translate(${x - 20}px, ${y - 20}px)` }}>
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

  const profile = profileData[id as keyof typeof profileData];

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

  const sortedPublications = [...profile.publications].sort((a, b) => {
    if (sortBy === 'citations') return b.citations - a.citations;
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'venue') return a.venue.localeCompare(b.venue);
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
                    <span className="text-sm">{profile.totalCitations.toLocaleString()} citations</span>
                  </div>
                </div>

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent-foreground text-xs font-bold">AI</span>
                    </div>
                    <p className="text-sm leading-relaxed">{profile.aiSummary}</p>
                  </div>
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
              <RadarChart metrics={profile.metrics} />
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
              <CoauthorNetwork coauthors={profile.coauthors} />
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
                            {paper.citations} citations
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