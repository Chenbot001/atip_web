import React from 'react';
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

// Sample data
const databaseStats = [
  { label: 'Researchers Indexed', value: '2.4M+', icon: Users, color: 'text-blue-600' },
  { label: 'Papers Analyzed', value: '15.7M+', icon: FileText, color: 'text-green-600' },
  { label: 'Premier Venues Covered', value: '450+', icon: Database, color: 'text-purple-600' }
];

const leaderboardPreviews = [
  {
    id: 'anci',
    title: 'ANCI Leaders',
    description: 'Academic Network Citation Index',
    icon: Trophy,
    color: 'text-yellow-600',
    topResearchers: [
      'Dr. Sarah Chen',
      'Prof. Michael Rodriguez', 
      'Dr. Emily Watson',
      'Dr. James Liu',
      'Prof. Anna Kowalski'
    ]
  },
  {
    id: 'accel',
    title: 'Acceleration Leaders',
    description: 'Research momentum tracking',
    icon: TrendingUp,
    color: 'text-green-600',
    topResearchers: [
      'Dr. James Liu',
      'Prof. Lisa Zhang',
      'Dr. David Kumar',
      'Prof. Maria Santos',
      'Dr. Alex Chen'
    ]
  },
  {
    id: 'pqi',
    title: 'PQI Leaders',
    description: 'Publication Quality Index',
    icon: Star,
    color: 'text-purple-600',
    topResearchers: [
      'Prof. Anna Kowalski',
      'Dr. Robert Smith',
      'Prof. Jennifer Lee',
      'Dr. Thomas Wilson',
      'Prof. Amanda Brown'
    ]
  }
];

const spotlightAuthor = {
  name: 'Dr. Sarah Chen',
  title: 'Pioneer in Neural Architecture',
  affiliation: 'Stanford University',
  metric: 'ANCI Leader #1',
  description: 'Leading researcher in transformer networks and computer vision with groundbreaking contributions to deep learning optimization.',
  id: 'sarah-chen'
};

const publicationYearData = [
  { year: 2019, count: 45000 },
  { year: 2020, count: 52000 },
  { year: 2021, count: 58000 },
  { year: 2022, count: 61000 },
  { year: 2023, count: 67000 }
];

const MiniChart = () => {
  const maxCount = Math.max(...publicationYearData.map(d => d.count));
  
  return (
    <div className="flex items-end gap-1 h-16">
      {publicationYearData.map((data, index) => (
        <div key={data.year} className="flex flex-col items-center gap-1 flex-1">
          <div 
            className="bg-primary rounded-t w-full transition-all hover:bg-primary/80"
            style={{ height: `${(data.count / maxCount) * 100}%` }}
          />
          <span className="text-xs text-muted-foreground">{data.year}</span>
        </div>
      ))}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Scholar Sight Explorer
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover, analyze, and compare researchers worldwide with our AI-powered analytics platform. 
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
            {databaseStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Mini Chart */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Publications Per Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MiniChart />
              <p className="text-sm text-muted-foreground text-center mt-2">
                Growing at 8% annually
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Leaderboard Previews */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Research Leaderboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboardPreviews.map((leaderboard) => (
              <Card key={leaderboard.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <leaderboard.icon className={`h-6 w-6 ${leaderboard.color}`} />
                    <div>
                      <div className="text-lg">{leaderboard.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {leaderboard.description}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {leaderboard.topResearchers.map((researcher, index) => (
                      <div key={researcher} className="flex items-center gap-3">
                        <span className="text-sm font-bold text-muted-foreground w-6">
                          {index + 1}.
                        </span>
                        <span className="text-sm">{researcher}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/leaderboards?metric=${leaderboard.id}`}>
                      View Full Leaderboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Spotlight Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Researcher Spotlight</h2>
          <Card className="max-w-4xl mx-auto hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
            <Link to={`/profile/${spotlightAuthor.id}`}>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {spotlightAuthor.metric}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{spotlightAuthor.name}</h3>
                    <p className="text-lg text-primary font-semibold mb-2">{spotlightAuthor.title}</p>
                    <p className="text-muted-foreground mb-4">{spotlightAuthor.affiliation}</p>
                    <p className="leading-relaxed">{spotlightAuthor.description}</p>
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

export default Index;
