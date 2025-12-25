export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to fetch the requested asset
    let response = await env.ASSETS.fetch(request);
    
    // If we get a 404, serve custom 404 page
    if (response.status === 404) {
      const notFoundUrl = url.origin + '/404.html';
      response = await env.ASSETS.fetch(notFoundUrl);
      
      // Return with 404 status but the HTML content
      return new Response(response.body, {
        status: 404,
        headers: response.headers
      });
    }
    
    // Return the successful response as-is
    return response;
  }
};