// Helper function to handle RapidAPI news fetching with better error handling
export async function fetchTechnologyNews(rapidApiKey: string, rapidApiHost: string) {
  // Common endpoint patterns for news APIs on RapidAPI
  const commonPatterns = [
    { path: '', params: '?q=technology&lang=en&max=30' },
    { path: '', params: '?q=AI&lang=en&max=20' },
    { path: '', params: '?q=software&lang=en&max=20' },
    { path: '', params: '?q=tech&lang=en&max=20' },
    { path: '', params: '?q=programming&lang=en&max=20' },
    { path: '', params: '?query=technology&language=en&limit=20' },
    { path: '/news', params: '?query=technology&language=en&limit=20' },
    { path: '/headlines', params: '?country=us&category=technology' },
    { path: '/search', params: '?q=technology&sortBy=publishedAt&pageSize=20' },
    { path: '/articles', params: '?keyword=technology&lang=en' },
    { path: '/feed', params: '?topic=technology&limit=20' },
    { path: '/v1/news', params: '?q=technology&lang=en' },
    { path: '/api/news', params: '?query=technology&limit=20' }
  ];

  for (const pattern of commonPatterns) {
    const url = `https://${rapidApiHost}${pattern.path}${pattern.params}`;
    
    try {
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': rapidApiHost,
          'Accept': 'application/json'
        }
      });

      console.log(`${url} - Status: ${response.status}`);

      if (response.status === 200) {
        try {
          const data = await response.json();
          console.log(`Success with: ${url}`);
          return { success: true, data, url };
        } catch (jsonError) {
          console.warn(`JSON parsing error for ${url}:`, jsonError);
          continue;
        }
      } else if (response.status === 401) {
        return {
          success: false,
          error: 'Authentication failed',
          details: 'Your RapidAPI key appears to be invalid or expired.',
          suggestion: 'Please verify your RapidAPI key in your dashboard.'
        };
      } else if (response.status === 403) {
        return {
          success: false,
          error: 'Access forbidden',
          details: 'Your subscription may not include this news API.',
          suggestion: 'Check your RapidAPI subscription and ensure you have access to this endpoint.'
        };
      } else if (response.status === 429) {
        return {
          success: false,
          error: 'Rate limit exceeded',
          details: 'Too many requests to the API.',
          suggestion: 'Wait a moment and try again, or upgrade your RapidAPI plan.'
        };
      }
    } catch (error) {
      console.log(`Error testing ${url}:`, error);
      
      // If this is a network error or timeout, we should handle it gracefully
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn(`Network error for ${url}: ${error.message}`);
      } else if (error instanceof Error) {
        console.warn(`Request error for ${url}: ${error.message}`);
      }
      continue;
    }
  }

  // If we reach here, no endpoint worked
  return {
    success: false,
    error: 'No working endpoint found',
    details: `Unable to find a working endpoint for ${rapidApiHost}. The API may use a different structure than common patterns.`,
    suggestion: 'Please check your RapidAPI dashboard for the correct endpoint documentation and parameter format.',
    testedPatterns: commonPatterns.map(p => `${p.path}${p.params}`)
  };
}