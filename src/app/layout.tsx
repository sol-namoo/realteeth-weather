import './globals.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
