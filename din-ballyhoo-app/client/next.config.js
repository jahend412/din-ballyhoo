module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // This rewrites API calls to your backend server
      },
    ];
  },
};
