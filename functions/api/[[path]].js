// Simplified Cloudflare Pages Function for debugging /api/* routes

export async function onRequest(context) {
  // context contains request, env, params, waitUntil, next, data
  const { request, params } = context;
  const url = new URL(request.url);
  const path = url.pathname; // e.g., /api/products, /api/blogposts

  console.log(`Cloudflare Function received request for: ${path}`);

  // Basic routing based on path
  if (path.startsWith('/api/products')) {
    console.log("Responding to /api/products");
    const dummyProducts = [
      { id: 'prod_1', name: 'Debug Product 1', isFeatured: true },
      { id: 'prod_2', name: 'Debug Product 2', isFeatured: false },
    ];
    // Filter based on 'featured' query param if present
    const featured = url.searchParams.get('featured') === 'true';
    const responseData = featured ? dummyProducts.filter(p => p.isFeatured) : dummyProducts;
    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, // Add CORS header
    });
  }

  if (path.startsWith('/api/blogposts')) {
    console.log("Responding to /api/blogposts");
    const dummyPosts = [
      { id: 'post_1', title: 'Debug Post 1', content: '...' },
      { id: 'post_2', title: 'Debug Post 2', content: '...' },
    ];
    return new Response(JSON.stringify(dummyPosts), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, // Add CORS header
    });
  }

  if (path.startsWith('/api/contact') && request.method === 'POST') {
     console.log("Responding to POST /api/contact");
     // In a real scenario, you'd parse the body: const body = await request.json();
     return new Response(JSON.stringify({ message: "Debug message received!" }), {
       status: 201,
       headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, // Add CORS header
     });
  }

  // Fallback for other /api routes or methods
  console.log(`No specific handler for ${request.method} ${path}, returning 404`);
  return new Response(JSON.stringify({ message: `API route ${path} not found or method ${request.method} not handled` }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, // Add CORS header
  });
}

// Optional: Handle OPTIONS requests for CORS preflight
export async function onRequestOptions(context) {
 return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400', // Cache preflight for 1 day
    },
  });
}
