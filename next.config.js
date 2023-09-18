module.exports = {
  cacheTime: 31557600, // 1 year in seconds
  brand: {
    BRAND: process.env.NEXT_PUBLIC_BRAND,
  },
  mapApiKey: {
    map: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  },
  googleRecaptchaApiKey: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
  },
  clientBaseUrl: {
    siteKey: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "r2.kldlms.com",
      "stage-admin.cyfersoft.com",
      "riyadh-second-health-cluster-r3-uat.vercel.app",
    ],
  },
};
process.env.NEXT_PUBLIC_IMAGES_KEY;
