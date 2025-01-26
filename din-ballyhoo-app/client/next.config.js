module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_BACKEND_URL || "localhost",
      },
      {
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST || "localhost",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/:path*",
      },
    ];
  },

  reactStrictMode: true,
};
