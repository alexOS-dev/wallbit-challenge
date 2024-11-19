import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Shopping Cart Challenge',
  description: 'Wallbit Shopping Cart Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className='antialiased'>
        {children}
        <Toaster theme='light' richColors />
      </body>
    </html>
  );
}
