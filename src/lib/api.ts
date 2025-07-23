// Central API utility for ATIP backend

const API_BASE_URL = 'http://18.143.177.82'; // Updated to remote AWS server IP

// Helper for GET requests
async function apiGet<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  let url = API_BASE_URL + endpoint;
  if (params) {
    const query = new URLSearchParams(params).toString();
    url += '?' + query;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// --- Authors ---
export function fetchAuthors(params?: Record<string, any>) {
  return apiGet<any[]>('/authors/', params);
}
export function fetchAuthor(author_id: string | number) {
  return apiGet<any>(`/authors/${author_id}`);
}
export function fetchAuthorPapers(author_id: string | number) {
  return apiGet<any[]>(`/authors/${author_id}/papers`);
}
export function fetchAuthorAuthorships(author_id: string | number) {
  return apiGet<any[]>(`/authors/${author_id}/authorships`);
}

// --- Papers ---
export function fetchPapers(params?: Record<string, any>) {
  return apiGet<any[]>('/papers/', params);
}
export function fetchPaper(paper_id: string | number) {
  return apiGet<any>(`/papers/${paper_id}`);
}
export function fetchPaperAuthors(paper_id: string | number) {
  return apiGet<any[]>(`/papers/${paper_id}/authors`);
}
export function fetchPaperAuthorships(paper_id: string | number) {
  return apiGet<any[]>(`/papers/${paper_id}/authorships`);
}
export function fetchPaperCitations(paper_id: string | number) {
  return apiGet<any[]>(`/papers/${paper_id}/citations`);
}

// --- Rankings ---
export function fetchRanking(metric: 'pqi' | 'anci' | 'cagr', limit = 100) {
  return apiGet<any[]>(`/rankings/${metric}`, { limit });
}

// --- Stats ---
export function fetchStatsOverview() {
  return apiGet<any>('/stats/overview');
} 