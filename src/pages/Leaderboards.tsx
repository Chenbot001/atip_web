import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Quote, 
  ArrowUpDown,
  Filter,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const metrics = [
  {
    id: 'anci',
    name: 'ANCI',
    description: 'Academic Network Citation Index - measures research network impact',
    icon: Trophy,
    color: 'text-yellow-600'
  },
  {
    id: 'accel',
    name: 'Accel',
    description: 'Research acceleration metric - tracks momentum in recent work',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    id: 'pqi',
    name: 'PQI',
    description: 'Publication Quality Index - evaluates venue prestige and impact',
    icon: Star,
    color: 'text-purple-600'
  }
];

// Sample leaderboard data
const sampleData = {
  anci: [
    {
      rank: 1,
      name: 'Dr. Sarah Chen',
      affiliation: 'Stanford University',
      score: 95.8,
      papers: 127,
      citations: 15420,
      careerLength: '12 years',
      tags: ['Field Pioneer'],
      id: 'sarah-chen'
    },
    {
      rank: 2,
      name: 'Prof. Michael Rodriguez',
      affiliation: 'MIT',
      score: 94.2,
      papers: 89,
      citations: 12340,
      careerLength: '8 years',
      tags: ['Rising Star'],
      id: 'michael-rodriguez'
    },
    {
      rank: 3,
      name: 'Dr. Emily Watson',
      affiliation: 'UC Berkeley',
      score: 92.1,
      papers: 156,
      citations: 18230,
      careerLength: '15 years',
      tags: ['Field Pioneer'],
      id: 'emily-watson'
    },
    // Add more sample data...
  ],
  accel: [
    {
      rank: 1,
      name: 'Dr. James Liu',
      affiliation: 'Carnegie Mellon',
      score: 88.5,
      papers: 45,
      citations: 3420,
      careerLength: '3 years',
      tags: ['Rising Star'],
      id: 'james-liu'
    },
    // More data...
  ],
  pqi: [
    {
      rank: 1,
      name: 'Prof. Anna Kowalski',
      affiliation: 'Harvard University',
      score: 91.3,
      papers: 78,
      citations: 9870,
      careerLength: '9 years',
      tags: ['Quality Leader'],
      id: 'anna-kowalski'
    },
    // More data...
  ]
};

const Leaderboards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMetric = searchParams.get('metric') || 'anci';
  const [affiliationFilter, setAffiliationFilter] = useState('all');
  const [careerFilter, setCareerFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const currentData = sampleData[activeMetric as keyof typeof sampleData] || sampleData.anci;

  const handleMetricChange = (metric: string) => {
    setSearchParams({ metric });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Research Leaderboards
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover top researchers across different metrics and find the leaders in your field
          </p>
        </div>

        {/* Metric Tabs */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <Tabs value={activeMetric} onValueChange={handleMetricChange}>
              <TabsList className="grid w-full grid-cols-3">
                {metrics.map((metric) => (
                  <TabsTrigger key={metric.id} value={metric.id} className="flex items-center gap-2">
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    {metric.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-4">
                {metrics.map((metric) => (
                  <div key={metric.id} className={activeMetric === metric.id ? 'block' : 'hidden'}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm text-muted-foreground cursor-help">
                            {metric.description}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click for detailed methodology</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Sorting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Affiliation</label>
                <Select value={affiliationFilter} onValueChange={setAffiliationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Affiliations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Affiliations</SelectItem>
                    <SelectItem value="stanford">Stanford University</SelectItem>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="berkeley">UC Berkeley</SelectItem>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Career Stage</label>
                <Select value={careerFilter} onValueChange={setCareerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Career Stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Career Stages</SelectItem>
                    <SelectItem value="early">Early Career (&lt;5 years)</SelectItem>
                    <SelectItem value="mid">Mid Career (5-15 years)</SelectItem>
                    <SelectItem value="senior">Senior (&gt;15 years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Sort Order</label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Highest to Lowest</SelectItem>
                    <SelectItem value="asc">Lowest to Highest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              {metrics.find(m => m.id === activeMetric)?.name} Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">Rank</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Affiliation</TableHead>
                    <TableHead className="text-center bg-accent/10">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Score <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-center">Papers</TableHead>
                    <TableHead className="text-center">Citations</TableHead>
                    <TableHead className="text-center">Career</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((researcher) => (
                    <TableRow key={researcher.id} className="hover:bg-muted/50">
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-2xl font-bold text-muted-foreground">
                            {researcher.rank}
                          </span>
                          {researcher.rank <= 3 && (
                            <Trophy className="h-4 w-4 ml-1 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{researcher.name}</div>
                            <div className="flex gap-1 mt-1">
                              {researcher.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag === 'Rising Star' && <Star className="h-3 w-3 mr-1" />}
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {researcher.affiliation}
                        </span>
                      </TableCell>
                      <TableCell className="text-center bg-accent/5">
                        <span className="text-lg font-bold text-primary">
                          {researcher.score}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <BookOpen className="h-3 w-3 text-muted-foreground" />
                          {researcher.papers}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Quote className="h-3 w-3 text-muted-foreground" />
                          {researcher.citations.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm text-muted-foreground">
                          {researcher.careerLength}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/profile/${researcher.id}`}>
                            <Eye className="h-3 w-3 mr-1" />
                            View Profile
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboards;