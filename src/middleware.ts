import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_ENV } from '@/contants';

const NON_PROD_HTTP_AUTH_CREDENTIALS = 'riveo:dev';

export const middleware = (req: NextRequest): NextResponse => {
  if (APP_ENV === 'prod') {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization') ?? '';
  const authValue = basicAuth.split(' ')[1];
  if (!authValue || NON_PROD_HTTP_AUTH_CREDENTIALS !== atob(authValue)) {
    return NextResponse.json('Auth required', {
      status: 401,
      headers: {
        'WWW-authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
};
