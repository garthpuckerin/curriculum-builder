import { NextRequest, NextResponse } from 'next/server';

function getSimulatedCurriculum(prompt: string): string {
  const topicMatch = prompt.match(/Topic:\s*(.+?)(?=\n|Target Audience)/s);
  const audienceMatch = prompt.match(/Target Audience:\s*(.+?)(?=\n|Delivery)/s);
  const formatMatch = prompt.match(/Delivery Format:\s*(.+?)(?=\n|Total)/s);
  const durationMatch = prompt.match(/Total Duration:\s*(\d+)\s*minutes/);

  const topic = topicMatch?.[1]?.trim() || 'Sample Training Topic';
  const audience = audienceMatch?.[1]?.trim() || 'New Hires';
  const format = formatMatch?.[1]?.trim() || 'eLearning (SCORM)';
  const durationMins = parseInt(durationMatch?.[1] || '60', 10);
  const moduleCount = Math.max(2, Math.min(5, Math.round(durationMins / 15)));

  const modules = Array.from({ length: moduleCount }, (_, i) => ({
    title: `Module ${i + 1}: ${topic.split(' ').slice(0, 3).join(' ')} fundamentals`,
    duration: `${Math.round(durationMins / moduleCount)} minutes`,
    format: i === 0 ? 'Video + Knowledge Check' : 'Interactive + Quiz',
    objectives: [
      `Understand key concepts of ${topic.split(' ').slice(0, 2).join(' ')}`,
      `Apply best practices in real scenarios`,
      `Demonstrate competency through assessment`,
    ],
    activities: ['Watch instructional video', 'Complete practice exercise', 'Knowledge check'],
    assessment: 'Multiple-choice quiz (80% pass) + practical demonstration',
  }));

  const curriculum = {
    title: `${topic} — ${audience} Training`,
    description: `This curriculum provides ${audience} with comprehensive training on ${topic}. Learners will gain practical skills through ${format} delivery, with clear objectives and measurable outcomes.`,
    audience,
    format,
    totalDuration: `${durationMins} minutes`,
    prerequisites: ['Basic computer literacy', 'Access to LMS platform'],
    modules,
    deliveryNotes: `[Simulated output] Deploy to your LMS. Ensure all modules are sequenced correctly. Recommended: enable completion tracking and set prerequisites if needed.`,
  };

  return JSON.stringify(curriculum);
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const simulateHeader = req.headers.get('x-simulate') === 'true';
  const isDev = process.env.NODE_ENV === 'development';

  // In dev mode: simulate when no API key or when x-simulate header is sent
  if ((isDev && !apiKey) || simulateHeader) {
    const mockContent = getSimulatedCurriculum(prompt);
    return NextResponse.json({
      content: [{ type: 'text', text: mockContent }],
    });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Claude API error' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
