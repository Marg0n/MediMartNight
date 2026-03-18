import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
        pathname: "/**",
      },
    ],
  },
  experimental:{
    serverActions:{
      bodySizeLimit:'5mb',
    },
  },
  turbopack: {},
  // webpack: (config) => {
  //   config.resolve.alias["@"] = path.resolve(__dirname, "src");
  //   return config;
  // },
};

export default nextConfig;
