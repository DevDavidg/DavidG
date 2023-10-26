import Head from 'next/head';
import '@/app/globals.sass';
import '@/app/stylesheets/GlobalStyles.scss';

export const metadata = {
  title: 'DevDavidG',
  description: 'David Guillen, Frontend Developer UX / UI Designer',
  keywords: 'Next.js, TypeScript, Sass, React, Styled Components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="David Guillen" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
