import React, { useState, useEffect } from 'react';
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
import { fetchRanking } from '@/lib/api';

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

const Leaderboards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMetric = searchParams.get('metric') || 'anci';
  const [affiliationFilter, setAffiliationFilter] = useState('all');
  const [careerFilter, setCareerFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [data, setData] = useState<any>({ anci: [], cagr: [], pqi: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchRanking('anci', 100),
      fetchRanking('cagr', 100),
      fetchRanking('pqi', 100),
    ])
      .then(([anci, cagr, pqi]) => {
        setData({ anci, cagr, pqi });
      })
      .catch(() => setError('Error loading leaderboards'))
      .finally(() => setLoading(false));
  }, []);

  // Filtering and sorting client-side
  function filterAndSort(list: any[]) {
    let filtered = list;
    if (affiliationFilter !== 'all') {
      filtered = filtered.filter((r) =>
        r.affiliation?.toLowerCase().includes(affiliationFilter.toLowerCase())
      );
    }
    if (careerFilter !== 'all') {
      filtered = filtered.filter((r) => {
        const years = r.careerLength || r.career_length || 0;
        if (careerFilter === 'early') return years < 5;
        if (careerFilter === 'mid') return years >= 5 && years <= 15;
        if (careerFilter === 'senior') return years > 15;
        return true;
      });
    }
    filtered = [...filtered].sort((a, b) =>
      sortOrder === 'asc' ? a.score - b.score : b.score - a.score
    );
    return filtered;
  }

  // Defensive: always use an array for currentData
  const currentData = filterAndSort(Array.isArray(data[activeMetric]) ? data[activeMetric] : []);

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
            {loading && <p className="text-center py-8">Loading leaderboards...</p>}
            {error && <p className="text-center py-8 text-red-500">{error}</p>}
            {!loading && !error && (
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
                    {(currentData || []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No data available for this leaderboard.
                        </TableCell>
                      </TableRow>
                    ) : (
                      (currentData || []).map((researcher, index) => (
                        <TableRow key={researcher.id || researcher.author_id || index} className="hover:bg-muted/50">
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <span className="text-2xl font-bold text-muted-foreground">
                                {index + 1}
                              </span>
                              {index < 3 && (
                                <Trophy className="h-4 w-4 ml-1 text-yellow-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="font-medium">{researcher.name || `${researcher.first_name || ''} ${researcher.last_name || ''}`}</div>
                                <div className="flex gap-1 mt-1">
                                  {(researcher.tags || []).map((tag: string) => (
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
                              {researcher.affiliation || 'N/A'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center bg-accent/5">
                            <span className="text-lg font-bold text-primary">
                              {researcher.score || 'N/A'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <BookOpen className="h-3 w-3 text-muted-foreground" />
                              {researcher.papers || researcher.publication_count || 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Quote className="h-3 w-3 text-muted-foreground" />
                              {(researcher.citations || researcher.citation_count || 0).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm text-muted-foreground">
                              {researcher.careerLength || researcher.career_length || 'N/A'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/profile/${researcher.id || researcher.author_id}`}>
                                <Eye className="h-3 w-3 mr-1" />
                                View Profile
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboards;