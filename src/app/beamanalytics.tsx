// app/GoogleAnalytics.jsx

"use client";

import Script from "next/script";

const BeamAnalytics = () => {
  //You can show in the console the GA_TRACKING_ID to confirm

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://beamanalytics.b-cdn.net/beam.min.js" data-token="e9eac8f5-27e4-4cef-a2ea-60787efea7ba`}
        async
      />
    </>
  );
};

export default BeamAnalytics;
