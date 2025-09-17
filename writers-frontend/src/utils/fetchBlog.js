/**
 * Blog API request helper.
 *
 * @function fetchBlog
 * @description Utility function to send HTTP requests to the blog backend.
 * It uses `fetch` with the request body encoded as `application/x-www-form-urlencoded`.
 *
 * @param {"GET" | "POST"} method - HTTP method (e.g. "GET", "POST").
 * @param {string} resourceURI - API resource path that will be concatenated to `VITE_API_URL`.
 * @param {Object.<string, string>} [body] - Key-value pairs converted to `URLSearchParams` and sent as the request body.
 *   Ignored for methods that do not use a body (e.g. GET).
 *
 * @returns {Promise<Response>} A Promise that resolves to the `Response` object returned by `fetch`.
 *
 * @example
 * // Send login data
 * fetchBlog("POST", "/auth/login", { username: "user", password: "1234" })
 *   .then(res => res.json())
 *   .then(data => console.log(data));
 *
 * @example
 * // Fetch posts without a request body
 * fetchBlog("GET", "/posts")
 *   .then(res => res.json())
 *   .then(posts => console.log(posts));
 */
export function fetchBlog(method, resourceURI, body) {
  const { VITE_API_URL } = import.meta.env;
  const options = {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  if (method === "POST") {
    options.body = new URLSearchParams(body);
  }

  return fetch(VITE_API_URL + resourceURI, options);
}
