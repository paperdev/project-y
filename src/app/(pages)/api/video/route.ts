import { getVideoInfo } from '@/utils/video';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  let result = {
    url: '',
    env: process.env.NODE_ENV,
    error: ''
  }
  
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const apiKey = searchParams.get("apiKey");
  const videoId = searchParams.get("videoId");
  
  if (!apiKey || !videoId) {
    return NextResponse.json(result);
  }

  if (process.env.API_KEY !== apiKey) {
    return NextResponse.json(result);
  }

  try {
    const video = await getVideoInfo({videoURL: process.env.YOUTUBE_URL_WATCH + videoId});
    return NextResponse.json(video);
  }
  catch (error: any) {
    result.error = error.toString();
    return NextResponse.json(result);
  }
}