// app/GoogleAnalytics.jsx

"use client";

import Script from "next/script";

const BeamAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://beamanalytics.b-cdn.net/beam.min.js" data-token="${process.env.NEXT_PUBLIC_BEAM_ANALYTICS}"`}
        async
      />
    </>
  );
};

export default BeamAnalytics;
