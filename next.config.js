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
    YOUTUBE_REGION_URL: process.env.YOUTUBE_REGION_URL,
    YOUTUBE_SEARCH_URL: process.env.YOUTUBE_SEARCH_URL,
    YOUTUBE_URL_WATCH: process.env.YOUTUBE_URL_WATCH,
    YOUTUBE_URL_EMBED: process.env.YOUTUBE_URL_EMBED,
    YOUTUBE_URL_CHANNEL: process.env.YOUTUBE_URL_CHANNEL,
  },

  distDir: 'build',
  // output: 'export',
};

module.exports = nextConfig;
