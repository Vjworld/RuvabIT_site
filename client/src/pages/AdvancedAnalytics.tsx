import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import GoToTopButton from '@/components/GoToTopButton';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  conversionRate: number;
  topPages: Array<{ page: string; views: number; change: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number; sessions: number }>;
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>;
  realTimeUsers: number;
  geographicData: Array<{ country: string; sessions: number; percentage: number }>;
}

export default function AdvancedAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchAnalyticsData();
    
    // Auto-refresh data every 5 minutes
    const interval = setInterval(fetchAnalyticsData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // In a real application, this would fetch from Google Analytics API
      // For now, we'll simulate realistic data
      setTimeout(() => {
        setAnalyticsData({
          pageViews: 15420 + Math.floor(Math.random() * 1000),
          uniqueVisitors: 8240 + Math.floor(Math.random() * 500),
          bounceRate: 32.5 + Math.random() * 10,
          avgSessionDuration: '2m 34s',
          conversionRate: 3.8 + Math.random() * 2,
          realTimeUsers: 12 + Math.floor(Math.random() * 20),
          topPages: [
            { page: '/home', views: 4520, change: 12.5 },
            { page: '/ai-analytics', views: 2340, change: 23.1 },
            { page: '/qr-gen-tool', views: 1890, change: -5.2 },
            { page: '/trend-solver', views: 1650, change: 15.7 },
            { page: '/langscribe', views: 1420, change: 8.3 },
            { page: '/contact', views: 980, change: -2.1 },
          ],
          deviceBreakdown: [
            { device: 'Desktop', percentage: 58.3, sessions: 4820 },
            { device: 'Mobile', percentage: 35.7, sessions: 2940 },
            { device: 'Tablet', percentage: 6.0, sessions: 480 },
          ],
          trafficSources: [
            { source: 'Organic Search', visitors: 3240, percentage: 39.3 },
            { source: 'Direct', visitors: 2100, percentage: 25.5 },
            { source: 'Social Media', visitors: 1340, percentage: 16.3 },
            { source: 'Referral', visitors: 890, percentage: 10.8 },
            { source: 'Paid Search', visitors: 670, percentage: 8.1 },
          ],
          geographicData: [
            { country: 'India', sessions: 4280, percentage: 52.0 },
            { country: 'United States', sessions: 1640, percentage: 19.9 },
            { country: 'United Kingdom', sessions: 820, percentage: 9.9 },
            { country: 'Canada', sessions: 560, percentage: 6.8 },
            { country: 'Australia', sessions: 450, percentage: 5.5 },
            { country: 'Others', sessions: 490, percentage: 5.9 },
          ],
        });
        setIsLoading(false);
        setLastUpdated(new Date());
      }, 1000);
      
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(Math.round(num));
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  if (isLoading && !analyticsData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Loading analytics data...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Advanced Analytics Dashboard | Real-time Insights | Ruvab IT</title>
        <meta name="description" content="Comprehensive analytics dashboard with real-time visitor data, conversion tracking, and detailed performance metrics for Ruvab IT website." />
        <meta name="keywords" content="analytics dashboard, website analytics, real-time data, conversion tracking, visitor insights" />
        <link rel="canonical" href="https://ruvab.it.com/advanced-analytics" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time insights and performance metrics for Ruvab IT website
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            
            <Button
              onClick={fetchAnalyticsData}
              disabled={isLoading}
              size="sm"
              variant="outline"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Page Views</CardDescription>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData?.pageViews || 0)}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Unique Visitors</CardDescription>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData?.uniqueVisitors || 0)}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Bounce Rate</CardDescription>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(analyticsData?.bounceRate || 0)}</div>
              <div className="flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">-3.1% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Conversion Rate</CardDescription>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(analyticsData?.conversionRate || 0)}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+15.3% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Users */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  Real-time Users
                </CardTitle>
                <CardDescription>Users currently active on your site</CardDescription>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {analyticsData?.realTimeUsers || 0}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="pages">Top Pages</TabsTrigger>
            <TabsTrigger value="sources">Traffic</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>Most visited pages in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="w-8 h-6 text-xs">
                          {index + 1}
                        </Badge>
                        <div>
                          <div className="font-medium">{page.page}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatNumber(page.views)} views
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center ${page.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {page.change > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        <span className="text-sm font-medium">
                          {Math.abs(page.change).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.trafficSources.map((source) => (
                    <div key={source.source} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{source.source}</span>
                        <div className="text-right">
                          <div className="font-medium">{formatNumber(source.visitors)}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatPercentage(source.percentage)}
                          </div>
                        </div>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Sessions by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData?.deviceBreakdown.map((device) => {
                    const IconComponent = device.device === 'Desktop' ? Monitor : 
                                        device.device === 'Mobile' ? Smartphone : 
                                        Monitor;
                    
                    return (
                      <div key={device.device} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{device.device}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatNumber(device.sessions)}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatPercentage(device.percentage)}
                            </div>
                          </div>
                        </div>
                        <Progress value={device.percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Sessions by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.geographicData.map((country) => (
                    <div key={country.country} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{country.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatNumber(country.sessions)}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatPercentage(country.percentage)}
                          </div>
                        </div>
                      </div>
                      <Progress value={country.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}