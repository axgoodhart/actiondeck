import type { Metadata } from 'next';
import './globals.css';
import '../styles/dashboard.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AutoIdInjector } from '@/components/auto-id-injector';

export const metadata: Metadata = {
  title: 'Action Deck',
  description: 'Casual todos and personal project management.'
};

export default function RootLayout({
  children


}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html data-style-id="stylo-1143" id="el-346" lang="en" suppressHydrationWarning>
      <head data-style-id="stylo-1144" id="el-347">
        <link data-style-id="stylo-1145" id="el-348" rel="preconnect" href="https://fonts.googleapis.com" />
        <link data-style-id="stylo-1146" id="el-349" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link data-style-id="stylo-1147" id="el-350" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Nokie&family=Playwrite+NL&display=swap" rel="stylesheet" />
      </head>
      <body data-style-id="stylo-1148" id="el-351" className="font-body antialiased browzr-skin">
        <ThemeProvider data-style-id="stylo-1149"
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>

          <AutoIdInjector data-style-id="stylo-1150" />
          {children}
          <Toaster data-style-id="stylo-1151" />
        </ThemeProvider>
      </body>
    </html>);

}