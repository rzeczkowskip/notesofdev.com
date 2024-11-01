import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      ...[process.env.NEXT_PUBLIC_SERVER_URL, process.env.S3_PUBLIC_ENDPOINT]
        .filter(Boolean)
        .map((item) => {
          const url = new URL(item);

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          };
        }),
    ],
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withPayload(nextConfig);
