/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/login/business",
        destination: "http://localhost:8080/api/v1/login/business",
      },
    ];
  },
};

export default nextConfig;
