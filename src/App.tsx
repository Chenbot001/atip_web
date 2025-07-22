import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import APIDebug from './pages/APIDebug';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/profile/:id" element={<Profile />} />
            {/* Placeholder routes */}
            <Route path="/compare" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-3xl font-bold">Compare Feature Coming Soon</h1></div>} />
            <Route path="/methodology" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-3xl font-bold">Methodology Page Coming Soon</h1></div>} />
            <Route path="/affiliations/*" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-3xl font-bold">Affiliations Page Coming Soon</h1></div>} />
            <Route path="/api-debug" element={<APIDebug />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
