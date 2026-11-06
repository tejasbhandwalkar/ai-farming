import { NextResponse } from 'next/server';
import { fetchLiveWeather } from '@/lib/weather';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '18.1517');
  const lon = parseFloat(searchParams.get('lon') || '74.5772');

  const weather = await fetchLiveWeather(lat, lon);

  if (!weather) {
    return NextResponse.json(
      { error: 'हवामान माहिती मिळवण्यात अडचण आली आहे. इंटरनेट तपासा.', isAvailable: false },
      { status: 503 }
    );
  }

  return NextResponse.json({ ...weather, isAvailable: true });
}
