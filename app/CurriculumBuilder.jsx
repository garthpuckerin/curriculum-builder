import { useState, useRef, useEffect } from 'react';

const AUDIENCE_OPTIONS = [
  { id: 'new_hires', label: 'New Hires' },
  { id: 'managers', label: 'Managers' },
  { id: 'technical', label: 'Technical Staff' },
  { id: 'customer_facing', label: 'Customer-Facing' },
  { id: 'executives', label: 'Executives' },
  { id: 'partners', label: 'External Partners' },
];

const FORMAT_OPTIONS = [
  { id: 'elearning', label: 'eLearning (SCORM)' },
  { id: 'instructor_led', label: 'Instructor-Led' },
  { id: 'blended', label: 'Blended' },
  { id: 'microlearning', label: 'Microlearning' },
  { id: 'job_aid', label: 'Job Aid / Reference' },
  { id: 'video', label: 'Video Series' },
];

const DURATION_OPTIONS = [
  { id: '15', label: '15 min' },
  { id: '30', label: '30 min' },
  { id: '60', label: '1 hour' },
  { id: '120', label: '2 hours' },
  { id: '240', label: 'Half day' },
  { id: '480', label: 'Full day' },
];

const EXAMPLES = [
  {
    topic: 'Docebo LMS administration for IT help desk staff',
    audience: 'technical',
    format: 'blended',
    duration: '120',
  },
  {
    topic: 'AI prompt engineering fundamentals for non-technical employees',
    audience: 'new_hires',
    format: 'microlearning',
    duration: '30',
  },
  {
    topic: 'SCORM compliance and accessibility standards for content developers',
    audience: 'technical',
    format: 'elearning',
    duration: '60',
  },
  {
    topic: 'Manager onboarding to Workday learning workflows',
    audience: 'managers',
    format: 'instructor_led',
    duration: '60',
  },
];

function Tag({ label, selected, onClick, color = 'ink' }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: 100,
        border: selected ? '1.5px solid #1a1a2a' : '1.5px solid #d4cfc8',
        background: selected ? '#1a1a2a' : 'transparent',
        color: selected ? '#f5f0e8' : '#6b6560',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: selected ? 500 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function ModuleCard({ module, index, isStreaming }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      style={{
        border: '1px solid #e8e3dc',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#faf8f5',
        animation: `slideIn 0.3s ease forwards`,
        animationDelay: `${index * 0.08}s`,
        opacity: 0,
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
          background: expanded ? '#f5f0e8' : '#faf8f5',
          transition: 'background 0.15s ease',
          borderBottom: expanded ? '1px solid #e8e3dc' : 'none',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#1a1a2a',
            color: '#f5f0e8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16,
              fontWeight: 600,
              color: '#1a1a2a',
              marginBottom: 2,
            }}
          >
            {module.title}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#9a9590' }}>
            {module.duration} · {module.format}
          </div>
        </div>
        <div
          style={{
            color: '#9a9590',
            fontSize: 18,
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          ↓
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: '#9a9590',
                letterSpacing: '0.1em',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Learning Objectives
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {module.objectives.map((obj, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#c8956e', marginTop: 2, flexShrink: 0, fontSize: 14 }}>
                    ◆
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: '#3a3530',
                      lineHeight: 1.6,
                    }}
                  >
                    {obj}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {module.activities && (
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: '#9a9590',
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                Activities
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {module.activities.map((act, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: '#ede8e0',
                      color: '#5a5550',
                    }}
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          {module.assessment && (
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: '#9a9590',
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                Assessment
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: '#3a3530',
                  lineHeight: 1.6,
                }}
              >
                {module.assessment}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CurriculumOutput({ curriculum, isStreaming }) {
  if (!curriculum) return null;

  return (
    <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
      {/* Header */}
      <div
        style={{
          background: '#1a1a2a',
          borderRadius: 16,
          padding: '28px 32px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(200,149,110,0.15) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: '#c8956e',
            letterSpacing: '0.15em',
            marginBottom: 10,
            textTransform: 'uppercase',
          }}
        >
          Curriculum Design
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            fontWeight: 700,
            color: '#f5f0e8',
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {curriculum.title}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: '#8a8580',
            lineHeight: 1.6,
            marginBottom: 20,
            maxWidth: 600,
          }}
        >
          {curriculum.description}
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Total Duration', value: curriculum.totalDuration },
            { label: 'Modules', value: `${curriculum.modules?.length || 0} modules` },
            { label: 'Audience', value: curriculum.audience },
            { label: 'Format', value: curriculum.format },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: '#5a5560',
                  letterSpacing: '0.1em',
                  marginBottom: 3,
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#d4cfc8',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      {curriculum.prerequisites && curriculum.prerequisites.length > 0 && (
        <div
          style={{
            background: '#fef9f0',
            border: '1px solid #f0e8d8',
            borderRadius: 10,
            padding: '14px 18px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <span style={{ color: '#c8956e', fontSize: 16, flexShrink: 0, marginTop: 1 }}>◈</span>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: '#c8956e',
                letterSpacing: '0.1em',
                marginBottom: 6,
                textTransform: 'uppercase',
              }}
            >
              Prerequisites
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: '#6a5f50',
                lineHeight: 1.6,
              }}
            >
              {curriculum.prerequisites.join(' · ')}
            </div>
          </div>
        </div>
      )}

      {/* Modules */}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: '#9a9590',
          letterSpacing: '0.1em',
          marginBottom: 12,
          textTransform: 'uppercase',
        }}
      >
        Course Modules
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {curriculum.modules?.map((module, i) => (
          <ModuleCard key={i} module={module} index={i} isStreaming={isStreaming} />
        ))}
      </div>

      {/* Delivery notes */}
      {curriculum.deliveryNotes && (
        <div
          style={{
            border: '1px solid #e8e3dc',
            borderRadius: 10,
            padding: '16px 20px',
            background: '#faf8f5',
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#9a9590',
              letterSpacing: '0.1em',
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            Delivery Notes
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: '#3a3530',
              lineHeight: 1.8,
            }}
          >
            {curriculum.deliveryNotes}
          </div>
        </div>
      )}

      {/* LMS export hint */}
      <div
        style={{
          marginTop: 16,
          padding: '12px 18px',
          background: 'rgba(26,26,42,0.04)',
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#9a9590' }}>
          Ready to export to Docebo · Workday Learning · SuccessFactors
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#c8956e' }}>
          SCORM 2004 / xAPI compatible
        </span>
      </div>
    </div>
  );
}

export default function CurriculumBuilder() {
  const [topic, setTopic] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('new_hires');
  const [selectedFormat, setSelectedFormat] = useState('elearning');
  const [selectedDuration, setSelectedDuration] = useState('60');
  const [additionalContext, setAdditionalContext] = useState('');
  const [curriculum, setCurriculum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);

  const handleExample = (example) => {
    setTopic(example.topic);
    setSelectedAudience(example.audience);
    setSelectedFormat(example.format);
    setSelectedDuration(example.duration);
    setCharCount(example.topic.length);
  };

  const buildPrompt = () => {
    const audienceLabel = AUDIENCE_OPTIONS.find((a) => a.id === selectedAudience)?.label;
    const formatLabel = FORMAT_OPTIONS.find((f) => f.id === selectedFormat)?.label;
    const durationMins = parseInt(selectedDuration);

    return `You are an expert instructional designer with 15+ years building enterprise training programs for LMS platforms including Docebo, Workday Learning, and SuccessFactors.

Design a complete curriculum for the following:

Topic: ${topic}
Target Audience: ${audienceLabel}
Delivery Format: ${formatLabel}
Total Duration: ${durationMins} minutes
${additionalContext ? `Additional Context: ${additionalContext}` : ''}

Return ONLY valid JSON (no markdown, no backticks, no preamble) in exactly this structure:
{
  "title": "string — compelling curriculum title",
  "description": "string — 2-3 sentence overview of what learners will achieve",
  "audience": "${audienceLabel}",
  "format": "${formatLabel}",
  "totalDuration": "string — formatted duration e.g. '60 minutes'",
  "prerequisites": ["string", "string"],
  "modules": [
    {
      "title": "string — module title",
      "duration": "string — e.g. '15 minutes'",
      "format": "string — e.g. 'Video + Knowledge Check'",
      "objectives": ["string", "string", "string"],
      "activities": ["string", "string"],
      "assessment": "string — how learning is measured"
    }
  ],
  "deliveryNotes": "string — practical guidance for facilitators or LMS admins on deploying this curriculum"
}

Design ${Math.max(2, Math.round(durationMins / 20))} to ${Math.max(3, Math.round(durationMins / 15))} modules that flow logically. Each module should have 2-4 learning objectives written as measurable outcomes. Be specific and practical — this should be immediately usable by an L&D team.`;
  };

  const generate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setIsStreaming(true);
    setCurriculum(null);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error.message || 'API error — check your connection');
        return;
      }

      const text = data.content?.[0]?.text || '';
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setCurriculum(parsed);
    } catch (err) {
      setError('Failed to generate curriculum. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #1a1a2a; color: #f5f0e8; }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #ede8e0; }
        ::-webkit-scrollbar-thumb { background: #c8bfb0; border-radius: 3px; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .generate-btn:hover:not(:disabled) {
          background: #2e2e40 !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(26,26,42,0.25) !important;
        }
        .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .example-chip:hover { background: #ede8e0 !important; border-color: #c8bfb0 !important; }
        .api-docs-link:hover { color: #1a1a2a !important; border-color: #c8bfb0 !important; }
      `}</style>

      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid #e0dbd4',
          padding: '0 32px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#faf8f5',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#1a1a2a',
              letterSpacing: '-0.02em',
            }}
          >
            Curriculum
          </div>
          <div style={{ width: 1, height: 18, background: '#e0dbd4' }} />
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#9a9590',
              letterSpacing: '0.08em',
            }}
          >
            AI-ASSISTED DESIGN
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href="/api-docs"
            className="api-docs-link"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#9a9590',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: 100,
              border: '1px solid #e0dbd4',
              transition: 'all 0.15s ease',
            }}
          >
            API Docs
          </a>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#c8956e',
              background: '#fef4ec',
              padding: '4px 10px',
              borderRadius: 100,
              border: '1px solid #f0dcc8',
            }}
          >
            ◆ Claude-powered
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 840, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Hero */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#c8956e',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Instructional Design · Powered by Claude
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42,
              fontWeight: 700,
              color: '#1a1a2a',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}
          >
            Design training that
            <br />
            actually gets used
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: '#6b6560',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Generate structured curricula with learning objectives, activities, and assessments —
            ready to deploy to Docebo, Workday Learning, or SuccessFactors.
          </p>
        </div>

        {/* Input card */}
        <div
          style={{
            background: '#faf8f5',
            border: '1px solid #e0dbd4',
            borderRadius: 16,
            padding: '28px',
            marginBottom: 24,
            boxShadow: '0 2px 16px rgba(26,26,42,0.06)',
          }}
        >
          {/* Topic input */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: '#9a9590',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Training Topic
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                ref={textareaRef}
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setCharCount(e.target.value.length);
                }}
                placeholder="e.g. Docebo LMS administration for IT help desk staff"
                rows={2}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#fff',
                  border: '1.5px solid #e0dbd4',
                  borderRadius: 10,
                  resize: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: '#1a1a2a',
                  lineHeight: 1.6,
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1a1a2a')}
                onBlur={(e) => (e.target.style.borderColor = '#e0dbd4')}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 12,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: '#c8bfb0',
                }}
              >
                {charCount}
              </div>
            </div>
          </div>

          {/* Options row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 20,
              marginBottom: 20,
            }}
          >
            {[
              {
                label: 'Audience',
                options: AUDIENCE_OPTIONS,
                value: selectedAudience,
                setter: setSelectedAudience,
              },
              {
                label: 'Format',
                options: FORMAT_OPTIONS,
                value: selectedFormat,
                setter: setSelectedFormat,
              },
              {
                label: 'Duration',
                options: DURATION_OPTIONS,
                value: selectedDuration,
                setter: setSelectedDuration,
              },
            ].map((group) => (
              <div key={group.label}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: '#9a9590',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.options.map((opt) => (
                    <Tag
                      key={opt.id}
                      label={opt.label}
                      selected={group.value === opt.id}
                      onClick={() => group.setter(opt.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional context */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: '#9a9590',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Additional Context <span style={{ color: '#c8bfb0' }}>(optional)</span>
            </label>
            <textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Compliance requirements, prior knowledge level, existing materials to build on..."
              rows={2}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#fff',
                border: '1.5px solid #e0dbd4',
                borderRadius: 10,
                resize: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: '#1a1a2a',
                lineHeight: 1.6,
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#1a1a2a')}
              onBlur={(e) => (e.target.style.borderColor = '#e0dbd4')}
            />
          </div>

          {/* Generate button */}
          <button
            className="generate-btn"
            onClick={generate}
            disabled={!topic.trim() || isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#1a1a2a',
              border: 'none',
              borderRadius: 10,
              color: '#f5f0e8',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(26,26,42,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {isLoading ? (
              <>
                <span style={{ animation: 'pulse 1.2s ease infinite' }}>◆</span>
                Designing curriculum...
              </>
            ) : (
              <>◆ Generate Curriculum</>
            )}
          </button>
        </div>

        {/* Examples */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#9a9590',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Try an example
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                className="example-chip"
                onClick={() => handleExample(ex)}
                style={{
                  padding: '7px 14px',
                  background: '#faf8f5',
                  border: '1px solid #e0dbd4',
                  borderRadius: 100,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: '#6b6560',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
              >
                {ex.topic.length > 55 ? ex.topic.slice(0, 55) + '…' : ex.topic}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: '#fff5f5',
              border: '1px solid #fcd4d4',
              borderRadius: 10,
              padding: '14px 18px',
              marginBottom: 24,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: '#c45a5a',
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Output */}
        {curriculum && <CurriculumOutput curriculum={curriculum} isStreaming={isStreaming} />}
      </div>
    </div>
  );
}
