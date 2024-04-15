/**
 * @type {import('next').NextConfig}
 */

const path = require('path');
const dotenv = require('dotenv');

// TODO:
dotenv.config({ path: path.join(__dirname, 'env.local') });

const nextConfig = {
  /* config options here */
  env: {
    DEFAULT_REGION: process.env.DEFAULT_REGION,
    YOUTUBE_KEY: process.env.YOUTUBE_KEY,
    YOUTUBE_BASE_URL: process.env.YOUTUBE_BASE_URL,

    YOUTUBE_VIDEO_URL: process.env.YOUTUBE_VIDEO_URL,
    YOUTUBE_SEARCH_URL: process.env.YOUTUBE_SEARCH_URL,
    YOUTUBE_CHANNEL_URL: process.env.YOUTUBE_CHANNEL_URL,
    YOUTUBE_PLAYLISTITEMS_URL: process.env.YOUTUBE_PLAYLISTITEMS_URL,
    YOUTUBE_REGION_URL: process.env.YOUTUBE_REGION_URL,
    YOUTUBE_VIDEO_CATEGORY_URL: process.env.YOUTUBE_VIDEO_CATEGORY_URL,

    YOUTUBE_URL: process.env.YOUTUBE_URL,
    YOUTUBE_URL_WATCH: process.env.YOUTUBE_URL_WATCH,
    YOUTUBE_URL_EMBED: process.env.YOUTUBE_URL_EMBED,
    YOUTUBE_URL_CHANNEL: process.env.YOUTUBE_URL_CHANNEL,
    YOUTUBE_URL_THUMBNAIL: process.env.YOUTUBE_URL_THUMBNAIL,
    YOUTUBE_URL_PLAYER: process.env.YOUTUBE_URL_PLAYER,

    GOOGLE_TREND_URL: process.env.GOOGLE_TREND_URL,
    GOOGLE_TREND_DAILY_URL: process.env.GOOGLE_TREND_DAILY_URL,
  },

  async rewrites() {
    return [
      {
        source: "/watch",
        destination: `${process.env.YOUTUBE_URL}/watch`,
      },
      {
        source: "/s/:path*",
        destination: `${process.env.YOUTUBE_URL}/s/:path*`,
      },
      {
        source: '/:path*',
        destination: `${process.env.GOOGLE_TREND_URL}/:path*`,
      },
    ];
  },

  distDir: 'build',
  // output: 'export',
};

module.exports = nextConfig;
