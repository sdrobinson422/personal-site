export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    try {
      // Try to fetch the requested asset
      const response = await env.ASSETS.fetch(request);
      
      // If we get a successful response, return it
      if (response.ok) {
        return response;
      }
      
      // If not found, serve 404 page
      const notFoundResponse = await env.ASSETS.fetch(new URL('/404.html', url.origin));
      return new Response(notFoundResponse.body, {
        status: 404,
        statusText: 'Not Found',
        headers: notFoundResponse.headers
      });
    } catch (e) {
      // If there's any error, serve 404 page
      try {
        const notFoundResponse = await env.ASSETS.fetch(new URL('/404.html', url.origin));
        return new Response(notFoundResponse.body, {
          status: 404,
          statusText: 'Not Found',
          headers: notFoundResponse.headers
        });
      } catch {
        // Fallback if even 404.html fails
        return new Response('404 Not Found', { 
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }
  }
};