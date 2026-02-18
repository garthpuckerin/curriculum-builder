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

  it('returns 200 with simulated curriculum when x-simulate header is sent', async () => {
    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-simulate': 'true',
      },
      body: JSON.stringify({
        prompt:
          'Topic: Safety training\nTarget Audience: New Hires\nDelivery Format: eLearning\nTotal Duration: 60 minutes',
      }),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.content).toBeDefined();
    const curriculum = JSON.parse(data.content[0].text);
    expect(curriculum.title).toContain('Safety training');
    expect(curriculum.modules).toHaveLength(4);
  });

  it('returns simulated curriculum with defaults when prompt has no matches', async () => {
    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-simulate': 'true',
      },
      body: JSON.stringify({ prompt: 'minimal prompt' }),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    const curriculum = JSON.parse(data.content[0].text);
    expect(curriculum.title).toContain('Sample Training Topic');
    expect(curriculum.audience).toBe('New Hires');
  });

  it('returns 500 when fetch throws', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'test prompt' }),
    });

    const response = await POST(req as never);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Internal server error');
    consoleSpy.mockRestore();
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
