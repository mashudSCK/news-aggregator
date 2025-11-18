import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'us';
    const category = searchParams.get('category') || '';
    const max = searchParams.get('max') || '10';

    const params = new URLSearchParams({
      token: API_KEY,
      country: country,
      max: max,
    });

    if (category && category !== 'general') {
      params.append('topic', category);
    }

    const response = await fetch(`${BASE_URL}/top-headlines?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0] || data.message || 'Failed to fetch news' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      status: 'ok',
      totalResults: data.totalArticles || 0,
      articles: data.articles || [],
    });
  } catch (error) {
    console.error('Error in headlines API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
