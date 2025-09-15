/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/budgets", permanent: false },
    ];
  },
};
export default nextConfig;