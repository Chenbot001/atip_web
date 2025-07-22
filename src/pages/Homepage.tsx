import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  FileText,
  Users,
  TrendingUp,
  Trophy,
  Star,
  ArrowRight,
  BarChart3,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import { fetchStatsOverview, fetchRanking } from '@/lib/api';

// Remove publicationYearData and MiniChart

const Homepage = () => {
  const [stats, setStats] = useState<any>(null);
  const [leaderboards, setLeaderboards] = useState<any>({ anci: [], cagr: [], pqi: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchStatsOverview(),
      fetchRanking('anci', 5),
      fetchRanking('cagr', 5),
      fetchRanking('pqi', 5),
    ])
      .then(([statsData, anci, cagr, pqi]) => {
        setStats(statsData);
        setLeaderboards({ anci, cagr, pqi });
      })
      .catch(() => setError('Error loading home page data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;
  }

  // Helper to safely get a field or 'N/A'
  const safe = (val: any) => (val === undefined || val === null || val === '' ? 'N/A' : val);

  // Leaderboard preview config
  const leaderboardConfigs = [
    {
      key: 'anci',
      title: 'ANCI Leaders',
      description: 'Academic Network Citation Index',
      icon: <Trophy className="h-6 w-6 text-yellow-600" />,
    },
    {
      key: 'cagr',
      title: 'Acceleration Leaders',
      description: 'Research momentum tracking',
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    },
    {
      key: 'pqi',
      title: 'PQI Leaders',
      description: 'Publication Quality Index',
      icon: <Star className="h-6 w-6 text-purple-600" />,
    },
  ];

  // Spotlight researcher: top ANCI leader
  const spotlightAuthor = leaderboards.anci && leaderboards.anci.length > 0 ? leaderboards.anci[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            ATIP
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            AI Talent Insights Platform - Discover, analyze, and compare researchers worldwide with our AI-powered analytics platform.
            Explore academic networks, track research momentum, and find the leaders in your field.
          </p>
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <SearchBar className="w-full max-w-2xl" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {/* Database Statistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Research Database</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-primary">{safe(stats?.total_researchers)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-medium">Researchers Indexed</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-primary">{safe(stats?.total_papers)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-medium">Papers Analyzed</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-primary">{safe(stats?.total_venues)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-medium">Premier Venues Covered</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leaderboard Previews */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Research Leaderboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboardConfigs.map((config) => {
              const lb = leaderboards[config.key] || [];
              return (
                <Card key={config.key} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {config.icon}
                      <div>
                        <div className="text-lg">{config.title}</div>
                        <div className="text-sm font-normal text-muted-foreground">
                          {config.description}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {lb.map((researcher: any, index: number) => (
                        <div key={researcher.author_id || index} className="flex items-center gap-3">
                          <span className="text-sm font-bold text-muted-foreground w-6">
                            {index + 1}.
                          </span>
                          <span className="text-sm">{safe(researcher.first_name)} {safe(researcher.last_name)}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/leaderboards?metric=${config.key}`}>
                        View Full Leaderboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Spotlight Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Researcher Spotlight</h2>
          <Card className="max-w-4xl mx-auto hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
            <Link to={`/profile/${spotlightAuthor?.author_id}`}> 
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        ANCI Leader #1
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{safe(spotlightAuthor?.first_name)} {safe(spotlightAuthor?.last_name)}</h3>
                    <p className="text-lg text-primary font-semibold mb-2">{safe(spotlightAuthor?.affiliation)}</p>
                    <p className="leading-relaxed">AI-generated summary of author...</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button>
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Homepage; 