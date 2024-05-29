import { getVideoInfo } from '@/utils/video';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  let result = {
    url: ''
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const videoId = searchParams.get("videoId");
  if (!videoId) {
    return NextResponse.json(result);
  }

  const video = await getVideoInfo({videoURL: process.env.YOUTUBE_URL_WATCH + videoId});
  return NextResponse.json(video);
}