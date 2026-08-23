import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REDIRECT_PORT = 4280;
const REDIRECT_PATH = '/oauth2/callback';
const REDIRECT_URI = `http://127.0.0.1:${REDIRECT_PORT}${REDIRECT_PATH}`;
const DEFAULT_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
];

function loadEnvFile(filename) {
  const filePath = resolve(process.cwd(), filename);
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const scopes = (process.env.GOOGLE_OAUTH_SCOPES || DEFAULT_SCOPES.join(' '))
  .split(/[,\s]+/)
  .filter(Boolean);

if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local first.');
  process.exit(1);
}

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');
authUrl.searchParams.set('scope', scopes.join(' '));

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${REDIRECT_PORT}`);
  if (url.pathname !== REDIRECT_PATH) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  const error = url.searchParams.get('error');
  const code = url.searchParams.get('code');

  if (error || !code) {
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.end(`OAuth failed: ${error || 'missing code'}`);
    server.close();
    process.exit(1);
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    const payload = await tokenResponse.json();

    if (!tokenResponse.ok || !payload.refresh_token) {
      throw new Error(
        payload.error_description ||
          payload.error ||
          'No refresh token returned. Re-run with prompt=consent and a Desktop or Web client that allows localhost redirects.',
      );
    }

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Refresh token created. You can close this tab and return to the terminal.');

    console.log('\nAdd this to .env.local and to GitHub Actions / hosting secrets:\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${payload.refresh_token}\n`);
  } catch (tokenError) {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end(String(tokenError.message));
    console.error(tokenError);
    server.close();
    process.exit(1);
  }

  server.close();
  process.exit(0);
});

server.listen(REDIRECT_PORT, '127.0.0.1', () => {
  console.log('1. In Google Cloud Console, create an OAuth client (Web application).');
  console.log(`2. Add this Authorized redirect URI:\n   ${REDIRECT_URI}`);
  console.log('3. Sign in with a Monash account that can open the Apps Script web app.\n');
  console.log(authUrl.toString());
});
