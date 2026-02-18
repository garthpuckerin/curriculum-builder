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

  it('loads example when example chip is clicked', () => {
    render(<CurriculumBuilder />);
    const chip = screen.getByText(/Docebo LMS administration for IT help desk staff/);
    fireEvent.click(chip);
    const textarea = screen.getByPlaceholderText(/Docebo LMS administration/);
    expect(textarea).toHaveValue('Docebo LMS administration for IT help desk staff');
  });
});
