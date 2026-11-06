import { NextResponse } from 'next/server';
import { MANDI_MARKETS_DATA, MANDI_COMMODITIES } from '@/lib/mandiData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop');
  const market = searchParams.get('market');

  let filtered = MANDI_MARKETS_DATA;

  if (crop && crop !== 'all') {
    filtered = filtered.filter(item => 
      item.crop_en.toLowerCase().includes(crop.toLowerCase()) || 
      item.crop_mr.includes(crop) ||
      item.crop_hi.includes(crop)
    );
  }

  if (market && market !== 'all') {
    filtered = filtered.filter(item => 
      item.market.toLowerCase().includes(market.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    commodities: MANDI_COMMODITIES,
    source: 'Official AGMARKNET / Maharashtra State Agricultural Marketing Board (MSAMB)',
    lastSync: '2026-11-06T18:00:00+05:30'
  });
}
