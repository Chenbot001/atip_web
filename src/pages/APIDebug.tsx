import React, { useEffect, useState } from 'react';
import {
  fetchAuthors,
  fetchAuthor,
  fetchAuthorPapers,
  fetchAuthorAuthorships,
  fetchPapers,
  fetchPaper,
  fetchPaperAuthors,
  fetchPaperAuthorships,
  fetchPaperCitations,
  fetchRanking,
  fetchStatsOverview
} from '@/lib/api';

// Hardcoded test IDs (from Backend.md examples)
const TEST_AUTHOR_ID = 143977260;
const TEST_PAPER_ID = 219965343;

const endpointTests = [
  {
    name: 'API Info',
    fn: async () => {
      const res = await fetch('http://18.143.177.82/');
      return { status: res.status, data: await res.json() };
    }
  },
  {
    name: 'OpenAPI Schema',
    fn: async () => {
      const res = await fetch('http://18.143.177.82/openapi.json');
      return { status: res.status, data: await res.json() };
    }
  },
  {
    name: 'Authors List',
    fn: () => fetchAuthors({ limit: 2 })
  },
  {
    name: 'Author Detail',
    fn: () => fetchAuthor(TEST_AUTHOR_ID)
  },
  {
    name: 'Author Papers',
    fn: () => fetchAuthorPapers(TEST_AUTHOR_ID)
  },
  {
    name: 'Author Authorships',
    fn: () => fetchAuthorAuthorships(TEST_AUTHOR_ID)
  },
  {
    name: 'Author Coauthors',
    fn: async () => {
      const res = await fetch(`http://18.143.177.82/authors/${TEST_AUTHOR_ID}/coauthors`);
      return { status: res.status, data: await res.json() };
    }
  },
  {
    name: 'Papers List',
    fn: () => fetchPapers({ limit: 2 })
  },
  {
    name: 'Paper Detail',
    fn: () => fetchPaper(TEST_PAPER_ID)
  },
  {
    name: 'Paper Authors',
    fn: () => fetchPaperAuthors(TEST_PAPER_ID)
  },
  {
    name: 'Paper Authorships',
    fn: () => fetchPaperAuthorships(TEST_PAPER_ID)
  },
  {
    name: 'Paper Citations',
    fn: () => fetchPaperCitations(TEST_PAPER_ID)
  },
  {
    name: 'Ranking PQI',
    fn: () => fetchRanking('pqi', 3)
  },
  {
    name: 'Ranking ANCI',
    fn: () => fetchRanking('anci', 3)
  },
  {
    name: 'Ranking CAGR',
    fn: () => fetchRanking('cagr', 3)
  },
  {
    name: 'Stats Overview',
    fn: () => fetchStatsOverview()
  }
];

const APIDebug: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const exportResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      author_id: TEST_AUTHOR_ID,
      paper_id: TEST_PAPER_ID,
      results: results
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atip-api-debug-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all(
      endpointTests.map(async (test) => {
        try {
          const data = await test.fn();
          return { name: test.name, status: data.status ?? 'ok', data: data.data ?? data };
        } catch (e: any) {
          return { name: test.name, status: 'error', data: e.message };
        }
      })
    ).then(setResults).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ATIP API Endpoint Debug/Test</h1>
        {results.length > 0 && (
          <button 
            onClick={exportResults}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export Results
          </button>
        )}
      </div>
      <div className="mb-4 text-sm text-muted-foreground">
        Testing with Author ID: {TEST_AUTHOR_ID}, Paper ID: {TEST_PAPER_ID}
      </div>
      {loading && <div>Loading all endpoints...</div>}
      <div className="space-y-6">
        {results.map((r, i) => (
          <div key={i} className="border rounded p-4 bg-card">
            <div className="font-semibold mb-2">{r.name} <span className="text-xs text-muted-foreground">[{r.status}]</span></div>
            <pre className="overflow-x-auto text-xs bg-background p-2 rounded border max-h-64 text-foreground">{typeof r.data === 'string' ? r.data : JSON.stringify(r.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APIDebug;
