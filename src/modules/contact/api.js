import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const suffixPath = 'contact_us_form';

    const externalResponse = await fetch(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${suffixPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
