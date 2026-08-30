/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const publicApi = [
      { key: "X-Robots-Tag", value: "all" },
      { key: "Access-Control-Allow-Origin", value: "*" }
    ];
    return [
      { source: "/openapi.json", headers: publicApi },
      { source: "/.well-known/x402", headers: publicApi },
      { source: "/api/v1/:path*", headers: publicApi }
    ];
  }
};
module.exports = nextConfig;
