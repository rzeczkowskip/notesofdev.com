import Script from 'next/script';

type AnalyticsProps = {
  cloudflareToken?: string | null;
};
const Analytics = ({ cloudflareToken }: AnalyticsProps) => {
  if (!cloudflareToken) {
    return null;
  }

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: cloudflareToken })}
    />
  );
};

export default Analytics;
