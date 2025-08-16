import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, Calendar, ChevronDown, ChevronUp, Sparkles, TrendingUp, Zap, ArrowUpRight } from 'lucide-react';
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
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Technology News Only</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 tracking-tight">
              Tech News Hub
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover the latest breakthroughs, trends, and innovations shaping our digital future
            </p>
          </div>
          
          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <Skeleton className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">Connection Issue</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 tracking-tight">
              Tech News Hub
            </h1>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200/50 dark:border-red-800/50 rounded-2xl p-12 max-w-2xl mx-auto backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">News Service Configuration Needed</h2>
              <p className="text-red-600 dark:text-red-400 mb-6 leading-relaxed">
                To display live technology news, please verify your NewsAPI configuration:
              </p>
              <div className="text-left space-y-3 mb-6 bg-white/50 dark:bg-slate-900/50 rounded-xl p-4">
                <p className="text-sm font-medium text-red-700 dark:text-red-300">Configuration steps:</p>
                <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Check your NewsAPI key at <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">newsapi.org</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Ensure the API key has not expired
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Verify you haven't exceeded the free tier limits
                  </li>
                </ul>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-3 rounded mb-4">
                Error details: {error}
              </div>
              <Button 
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50 rounded-full px-4 py-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Technology News Only</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Smart Filtering Active</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Tech News Hub
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Exclusively curated technology articles from NewsNow and Event Registry
          </p>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Advanced filtering ensures only AI, software, cybersecurity, blockchain, and tech industry news appears here
          </div>
        </div>
        
        {/* AdSense Ad - After Header */}
        <div className="py-8 flex justify-center">
          <div className="text-center max-w-2xl">
            <div className="text-xs text-slate-500 mb-2">Advertisement</div>
            <AdSenseAd 
              adSlot="7834958241" 
              adFormat="horizontal" 
              className="mx-auto"
            />
          </div>
        </div>
        
        {news.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-12 max-w-2xl mx-auto backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Multi-Source Feed Connected
              </h2>
              <p className="text-blue-600 dark:text-blue-400 mb-6 leading-relaxed">
                Both NewsNow and Event Registry APIs are responding successfully, but no articles match the current filters.
              </p>
              <div className="text-left space-y-3 mb-6 bg-white/50 dark:bg-slate-900/50 rounded-xl p-4">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Possible reasons:</p>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Temporary rate limiting on news providers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Search criteria filters need adjustment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Low activity period for technology news
                  </li>
                </ul>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Refresh Feed
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(0, 12).map((article) => {
              const isExpanded = expandedArticles.has(article.id);
              return (
                <Card key={article.id} className="group overflow-hidden border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&q=80';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg text-xs font-medium">
                        {article.source.name}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    {/* Meta Information */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(article.publishedAt)}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-xl mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {article.title}
                    </h3>
                    
                    {/* Summary Points */}
                    {article.summary && article.summary.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                          Key Highlights
                        </h4>
                        <ul className="space-y-2">
                          {article.summary.slice(0, 4).map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Description */}
                    {article.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-1 leading-relaxed">
                        {article.description}
                      </p>
                    )}
                    
                    {/* Expanded Content */}
                    {isExpanded && article.content && (
                      <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                        <h4 className="font-semibold text-sm mb-3 text-blue-700 dark:text-blue-300">Full Article Content</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {article.content}
                        </p>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleArticleExpansion(article.id);
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 transition-all duration-300"
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
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
                      >
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit Source
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3">
            <Sparkles className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Powered by NewsNow & Event Registry • Updated continuously
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyNews;