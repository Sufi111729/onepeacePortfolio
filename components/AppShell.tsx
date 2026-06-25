'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <ChatbotWidget />
      <Footer />
    </>
  );
}
