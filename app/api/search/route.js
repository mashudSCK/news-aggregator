import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const lang = searchParams.get('lang') || 'en';
    const max = searchParams.get('max') || '10';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      q: query,
      token: API_KEY,
      lang: lang,
      max: max,
    });

    const response = await fetch(`${BASE_URL}/search?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0] || data.message || 'Failed to search news' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      status: 'ok',
      totalResults: data.totalArticles || 0,
      articles: data.articles || [],
    });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
