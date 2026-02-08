export const RUST_API_BASE_URL = "http://0.0.0.0:3001";

/**
 * A generic handler to proxy API requests to the Rust backend.
 * It forwards the path and query parameters from the incoming request.
 *
 * @param req The incoming request from the client.
 * @param endpoint The specific API endpoint on the Rust backend (e.g., "/api/v1/blocks").
 * @returns A Response object to send back to the client.
 */

export async function proxyApi(
  req: Request,
  endpoint: string,
): Promise<Response> {
  try {
    const url = new URL(req.url);
    const backendUrl = `${RUST_API_BASE_URL}${endpoint}${url.search}`;
    const response = await fetch(backendUrl);

    // Stream the response directly from the backend to the client.
    // This avoids re-serializing the JSON and preserves headers.
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json"); // Explicitly set the content type

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers, // Pass the modified headers to the new response.
    });
  } catch (error) {
    console.error(`Error in API proxy for endpoint "${endpoint}":`, error);
    return new Response(
      JSON.stringify({ error: "Internal proxy server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
