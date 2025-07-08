/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/(.*)",
        destination: "https://trymeela.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
