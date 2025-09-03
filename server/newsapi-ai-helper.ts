// Helper function to fetch news from NewsAPI.ai
export async function fetchNewsAPIaiData(apiKey: string) {
  try {
    console.log("Fetching from NewsAPI.ai...");
    
    const url = 'http://eventregistry.org/api/v1/article/getArticles';
    
    // Use GET method with technology-specific parameters
    const params = new URLSearchParams({
      apiKey: apiKey,
      action: 'getArticles',
      keyword: 'technology OR software OR AI OR "artificial intelligence" OR programming OR cybersecurity OR blockchain OR cloud OR "machine learning"',
      categoryUri: 'dmoz/Computers',
      lang: 'eng',
      articlesCount: '10',
      articlesSortBy: 'date',
      dataType: 'news,pr'
    });

    const fullUrl = `${url}?${params.toString()}`;
    console.log("NewsAPI.ai request URL:", fullUrl);

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    console.log(`NewsAPI.ai response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NewsAPI.ai error ${response.status}:`, errorText);
      return {
        success: false,
        error: `NewsAPI.ai request failed with status ${response.status}`,
        details: errorText
      };
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('NewsAPI.ai JSON parsing error:', jsonError);
      return {
        success: false,
        error: 'Invalid JSON response from NewsAPI.ai',
        details: 'The API returned an invalid JSON response'
      };
    }
    console.log("NewsAPI.ai response structure:", Object.keys(data));
    console.log("NewsAPI.ai data.articles structure:", data.articles ? Object.keys(data.articles) : 'no articles key');
    console.log("NewsAPI.ai articles count:", data.articles?.count || 'no count');
    console.log("NewsAPI.ai articles.results length:", data.articles?.results?.length || 'no results array');
    
    // Transform Event Registry response to our standard format
    // Event Registry structure: { articles: { results: [...], count: number } }
    const articles = data.articles?.results || [];
    
    const transformedArticles = articles.map((article: any, index: number) => {
      // Generate summary from article body
      const generateSummary = (body: string, title: string) => {
        if (!body || body.length < 50) return [
          'Technology industry development reported',
          'Breaking news in software and hardware sectors',
          'Analysis of latest tech market trends',
          'Expert insights on technological advancement',
          'Impact assessment for technology stakeholders'
        ];

        const sentences = body.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const summaryPoints = sentences.slice(0, 4).map(sentence => 
          sentence.trim().replace(/^\w/, c => c.toUpperCase())
        );
        
        // Ensure we have at least 4 points
        const fallbackPoints = [
          'Comprehensive technology news coverage',
          'Industry analysis and market insights',
          'Latest developments in tech sector',
          'Expert commentary on emerging trends',
          'Strategic implications for businesses'
        ];
        
        while (summaryPoints.length < 4) {
          summaryPoints.push(fallbackPoints[summaryPoints.length] || 'Technology news update');
        }
        
        return summaryPoints.slice(0, 5);
      };

      return {
        id: `eventregistry_${index}`,
        title: article.title || 'Technology News Update',
        description: article.body?.substring(0, 200) + '...' || 'Latest technology news and developments from Event Registry.',
        content: article.body || article.title || 'Technology news content from NewsAPI.ai Event Registry',
        summary: generateSummary(article.body, article.title),
        url: article.url || 'https://eventregistry.org',
        urlToImage: article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&q=80',
        publishedAt: article.dateTime || article.date || new Date().toISOString(),
        source: {
          id: 'event-registry',
          name: article.source?.title || article.source?.name || 'Event Registry'
        },
        author: article.authors?.[0]?.name || article.author || 'Event Registry'
      };
    });

    console.log(`NewsAPI.ai articles processed: ${transformedArticles.length}`);
    
    return {
      success: true,
      articles: transformedArticles
    };

  } catch (error) {
    console.error('NewsAPI.ai fetch error:', error);
    
    // Handle different types of errors more specifically
    if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
      return {
        success: false,
        error: "NewsAPI.ai request timeout",
        details: 'The request took too long to complete (30 second timeout)'
      };
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: "Network error connecting to NewsAPI.ai",
        details: 'Unable to establish connection to the news API service'
      };
    } else {
      return {
        success: false,
        error: "Failed to fetch from NewsAPI.ai",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}