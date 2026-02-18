import { render, screen, fireEvent } from '@testing-library/react';
import CurriculumBuilder from '../CurriculumBuilder';

// Mock fetch
global.fetch = jest.fn();

describe('CurriculumBuilder', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the main heading', () => {
    render(<CurriculumBuilder />);
    expect(screen.getByText(/Design training that/)).toBeInTheDocument();
  });

  it('disables generate button when topic is empty', () => {
    render(<CurriculumBuilder />);
    const button = screen.getByRole('button', { name: /Generate Curriculum/i });
    expect(button).toBeDisabled();
  });

  it('enables generate button when topic is entered', () => {
    render(<CurriculumBuilder />);
    const textarea = screen.getByPlaceholderText(/Docebo LMS administration/);
    fireEvent.change(textarea, { target: { value: 'Test topic' } });
    const button = screen.getByRole('button', { name: /Generate Curriculum/i });
    expect(button).not.toBeDisabled();
  });

  it('displays curriculum after successful generation', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              title: 'Test Curriculum',
              description: 'Test description',
              audience: 'New Hires',
              format: 'eLearning',
              totalDuration: '60 minutes',
              prerequisites: [],
              modules: [
                {
                  title: 'Module 1',
                  duration: '30 min',
                  format: 'Video',
                  objectives: ['Learn X'],
                  activities: ['Watch'],
                  assessment: 'Quiz',
                },
              ],
              deliveryNotes: 'Deploy it.',
            }),
          },
        ],
      }),
    });

    render(<CurriculumBuilder />);
    const textarea = screen.getByPlaceholderText(/Docebo LMS administration/);
    fireEvent.change(textarea, { target: { value: 'Test topic' } });
    const button = screen.getByRole('button', { name: /Generate Curriculum/i });
    fireEvent.click(button);

    expect(await screen.findByText('Test Curriculum')).toBeInTheDocument();
    expect(screen.getByText('Module 1')).toBeInTheDocument();
  });

  it('displays error when API returns error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ error: { message: 'Rate limited' } }),
    });

    render(<CurriculumBuilder />);
    fireEvent.change(screen.getByPlaceholderText(/Docebo LMS administration/), {
      target: { value: 'Test topic' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Generate Curriculum/i }));

    const errorEl = await screen.findByText(
      (content) => content.includes('Rate limited'),
      {},
      { timeout: 3000 }
    );
    expect(errorEl).toBeInTheDocument();
  });

  it('loads example when example chip is clicked', () => {
    render(<CurriculumBuilder />);
    const chip = screen.getByText(/Docebo LMS administration for IT help desk staff/);
    fireEvent.click(chip);
    const textarea = screen.getByPlaceholderText(/Docebo LMS administration/);
    expect(textarea).toHaveValue('Docebo LMS administration for IT help desk staff');
  });
});
