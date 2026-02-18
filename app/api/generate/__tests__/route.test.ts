/**
 * @jest-environment node
 */
import { POST } from '../route';

// Mock fetch
global.fetch = jest.fn();

describe('POST /api/generate', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...originalEnv, ANTHROPIC_API_KEY: 'test-key' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns 400 when no prompt provided', async () => {
    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('No prompt provided');
  });

  it('returns 500 when API key not configured', async () => {
    delete process.env.ANTHROPIC_API_KEY;

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'test prompt' }),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('API key not configured');
  });

  it('returns Claude API error when API fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'Invalid API key' } }),
    });

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'test prompt' }),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid API key');
  });

  it('returns 200 with content when API succeeds', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        content: [{ type: 'text', text: '{"title":"Test"}' }],
      }),
    });

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'test prompt' }),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.content).toBeDefined();
    expect(data.content[0].text).toContain('Test');
  });
});
