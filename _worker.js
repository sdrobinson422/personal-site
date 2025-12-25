export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to fetch the requested asset
    const response = await env.ASSETS.fetch(request);
    
    // If we get a 404 or error, serve custom 404 page
    if (response.status === 404) {
      try {
        const notFoundUrl = new URL('/404.html', url.origin);
        const notFoundRequest = new Request(notFoundUrl.toString());
        const notFoundResponse = await env.ASSETS.fetch(notFoundRequest);
        
        // Clone the response and set status to 404
        const body = await notFoundResponse.text();
        return new Response(body, {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache'
          }
        });
      } catch (err) {
        console.error('Error loading 404.html:', err);
        return new Response('404 Not Found', { 
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }
    
    // Return the successful response
    return response;
  }
};