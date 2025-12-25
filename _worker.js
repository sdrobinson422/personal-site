export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to fetch the requested asset
    let response = await env.ASSETS.fetch(request);
    
    // If we get a 404, serve custom 404 page
    if (response.status === 404) {
      try {
        const notFoundUrl = new URL('404.html', url.origin);
        const notFoundResponse = await env.ASSETS.fetch(notFoundUrl);
        
        // Check if 404.html actually exists
        if (notFoundResponse.status === 200) {
          return new Response(notFoundResponse.body, {
            status: 404,
            headers: notFoundResponse.headers
          });
        }
      } catch (error) {
        console.error('Error fetching 404.html:', error);
      }
      
      // Fallback if 404.html doesn't exist or fetch fails
      return new Response('404 - Page Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    // Return the successful response as-is
    return response;
  }
};