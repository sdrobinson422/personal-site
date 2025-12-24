export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    try {
      // Try to fetch the requested asset
      const response = await env.ASSETS.fetch(request);
      return response;
    } catch (e) {
      // If asset not found, serve 404 page
      try {
        const notFoundRequest = new Request(new URL('/404.html', url.origin), {
          method: 'GET'
        });
        const notFoundResponse = await env.ASSETS.fetch(notFoundRequest);
        
        return new Response(notFoundResponse.body, {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-Type': 'text/html; charset=utf-8'
          }
        });
      } catch (err) {
        // Fallback if even 404.html fails
        return new Response('404 Not Found - Error loading page', { 
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }
  }
};