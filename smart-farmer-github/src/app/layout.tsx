import type { Metadata } from 'next';
import { Noto_Sans_Devanagari, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { FarmProvider } from '@/context/FarmContext';

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SMART FARMER – स्मार्ट शेतकरी | Smart Agriculture Management System',
  description: 'सर्वसमावेशक आधुनिक कृषी व्यवस्थापन प्रणाली - शेतजमीन, पिके, खर्च-उत्पन्न, हवामान, बाजार भाव आणि AI शेती सल्लागार.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className={`${notoDevanagari.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-[#f8faf5] text-[#1c261d]">
        <LanguageProvider>
          <FarmProvider>
            {children}
          </FarmProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
