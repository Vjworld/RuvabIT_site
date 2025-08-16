import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import AdSenseAd from '@/components/AdSenseAd';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  summary: string[];
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
}

const TechnologyNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/technology-news`);
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleArticleExpansion = (articleId: string) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Technology News
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest developments in technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="h-[400px]">
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-4/5 mb-2" />
                <Skeleton className="h-3 w-3/5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Technology News
          </h1>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-destructive mb-2">News Service Configuration Needed</h2>
            <p className="text-sm text-muted-foreground mb-4">
              To display live technology news, please verify your NewsAPI configuration:
            </p>
            <div className="text-left space-y-2 mb-4">
              <p className="text-sm">• Check your NewsAPI key at <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">newsapi.org</a></p>
              <p className="text-sm">• Ensure the API key has not expired</p>
              <p className="text-sm">• Verify you haven't exceeded the free tier limits</p>
              <p className="text-sm">• Free accounts are limited to localhost/development domains</p>
            </div>
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded mb-4">
              Error details: {error}
            </div>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Latest Technology News
        </h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with the latest developments in technology
        </p>
      </div>
      
      {/* AdSense Ad - After Header */}
      <div className="py-6 flex justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-xs text-gray-500 mb-2">Advertisement</div>
          <AdSenseAd 
            adSlot="7834958241" 
            adFormat="horizontal" 
            className="mx-auto"
          />
        </div>
      </div>
      
      {news.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
              🔗 API Connection Successful!
            </h2>
            <p className="text-blue-600 dark:text-blue-400 mb-4">
              Your RapidAPI connection is working correctly, but no technology news articles were returned for the current search query.
            </p>
            <div className="text-left space-y-2 mb-4">
              <p className="text-sm text-blue-600 dark:text-blue-400">This could be due to:</p>
              <ul className="text-sm text-blue-600 dark:text-blue-400 list-disc list-inside space-y-1">
                <li>No recent technology news matching the search criteria</li>
                <li>API rate limiting or temporary data unavailability</li>
                <li>Search parameters may need adjustment for your specific news source</li>
              </ul>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950"
              onClick={() => window.location.reload()}
            >
              Refresh News Feed
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 12).map((article) => {
            const isExpanded = expandedArticles.has(article.id);
            return (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <CardHeader className="p-0">
                  {article.urlToImage && (
                    <div className="aspect-video overflow-hidden rounded-t-lg relative">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                          <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </a>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.source.name}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(article.publishedAt)}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Article Summary */}
                  {article.summary && article.summary.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Key Highlights:</h4>
                      <ul className="text-sm space-y-1">
                        {article.summary.slice(0, 4).map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {article.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {article.description}
                    </p>
                  )}
                  
                  {/* Expanded Content */}
                  {isExpanded && article.content && (
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg border">
                      <h4 className="font-medium text-sm mb-2">Full Article Content:</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {article.content}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleArticleExpansion(article.id)}
                      className="flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>
                          Show Less
                          <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Read More
                          <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-primary hover:text-primary/80"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Visit Source
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          News powered by RapidAPI • Updated every hour
        </p>
      </div>
    </div>
  );
};

export default TechnologyNews;