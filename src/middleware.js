import { NextResponse } from 'next/server'

export async function middleware(request) {
    if (request.method === 'POST' && request.nextUrl.pathname === '/api/proxy-contact') {
    try {
      // Clone the request body (can only be read once)
        const body = await request.json();
        const suffixPath = 'contact_us_form'

      // Forward the request to the external URL
      const externalResponse = await fetch(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${suffixPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      // Return the external response to the client
      const data = await externalResponse.json();
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }
  }
}

export const config = {
  matcher: [
    '/api/proxy-contact',
  ],
};