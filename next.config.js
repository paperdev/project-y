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
    YOUTUBE_KEY: process.env.YOUTUBE_KEY,
    YOUTUBE_TREND_VIDEO: process.env.YOUTUBE_TREND_VIDEO,
    YOUTUBE_URL_WATCH: process.env.YOUTUBE_URL_WATCH,
  },

  distDir: 'build',
  // output: 'export',
}
 
module.exports = nextConfig;