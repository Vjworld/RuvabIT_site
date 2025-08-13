import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Clock, Tag } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import GoToTopButton from "@/components/GoToTopButton";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search results query
  const { data: searchResults = [], isLoading: isSearching } = useQuery<any[]>({
    queryKey: ["/api/search", debouncedQuery, searchType],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];
      
      const params = new URLSearchParams({
        query: debouncedQuery,
        type: searchType,
        limit: "20",
      });
      
      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) {
        throw new Error("Search failed");
      }
      return await response.json();
    },
    enabled: !!debouncedQuery.trim(),
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query automatically
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Search Our Content
            </h1>
            <p className="text-xl text-muted-foreground">
              Find insights, solutions, and expertise across our blog posts and resources
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for insights, solutions, topics..."
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-4 py-3 border rounded-md bg-background min-w-[120px]"
                  >
                    <option value="all">All Content</option>
                    <option value="blog">Blog Posts</option>
                    <option value="page">Pages</option>
                  </select>
                  <Button type="submit" size="lg" className="px-8">
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="container mx-auto px-4 py-12">
        {searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  Search Results
                  {searchResults.length > 0 && (
                    <span className="text-muted-foreground font-normal">
                      {" "}({searchResults.length} found)
                    </span>
                  )}
                </h2>
                <p className="text-muted-foreground">
                  Results for "{searchQuery}"
                  {searchType !== "all" && ` in ${searchType}`}
                </p>
              </div>
              
              {isSearching && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Searching...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {searchResults.length > 0 && (
          <div className="grid gap-6 md:gap-8">
            {searchResults.map((result, index) => (
              <SearchResultCard key={index} result={result} query={searchQuery} />
            ))}
          </div>
        )}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No results found</h3>
              <p className="text-muted-foreground">
                We couldn't find any content matching "{searchQuery}". 
                Try different keywords or browse our latest posts below.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("AI automation")}>
                  AI automation
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("data analytics")}>
                  data analytics
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("business intelligence")}>
                  business intelligence
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("machine learning")}>
                  machine learning
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Start your search</h3>
              <p className="text-muted-foreground">
                Enter keywords to find relevant content across our blog posts and resources.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("AI automation")}>
                  AI automation
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("data analytics")}>
                  data analytics
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("business solutions")}>
                  business solutions
                </Badge>
              </div>
            </div>
          </div>
        )}
      </section>
      <GoToTopButton />
    </div>
  );
}

// Search Result Card Component
function SearchResultCard({ result, query }: { result: any; query: string }) {
  const getResultUrl = () => {
    switch (result.contentType) {
      case 'blog':
        return `/blog/${result.contentId}`;
      case 'page':
        return `/${result.contentId}`;
      default:
        return '#';
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {result.contentType === 'blog' ? 'Blog Post' : 'Page'}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(result.updatedAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold leading-tight">
                {highlightText(result.title, query)}
              </h3>
              
              <p className="text-muted-foreground">
                {highlightText(
                  result.content.length > 200 
                    ? result.content.substring(0, 200) + "..." 
                    : result.content,
                  query
                )}
              </p>
            </div>
            
            <Link href={getResultUrl()}>
              <Button variant="outline" size="sm" className="shrink-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}