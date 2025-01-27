module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "din-ballyhoo1-c04a1c0b364a.herokuapp.com",
        pathname: "/uploads/**",
      },
      // Keep your localhost pattern if needed for development
      {
        protocol: "http",
        hostname: "localhost",
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
