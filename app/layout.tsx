import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curriculum Builder — AI-Assisted Instructional Design',
  description:
    'Generate structured training curricula with learning objectives, activities, and assessments. Powered by Claude.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#f5f0e8' }}>{children}</body>
    </html>
  );
}
