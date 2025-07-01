import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [{
      protocol: "https",
      hostname: "pqp39k82ct.ufs.sh",
    }]
  }
};

export default nextConfig;
