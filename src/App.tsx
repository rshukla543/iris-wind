'use client';

import { Navigation } from '@/components/navigation/Navigation';
import { Hero } from '@/components/hero/Hero';
import { ChaptersLayout } from '@/components/ChaptersLayout';
import { CorporateCTA } from '@/components/corporate/CorporateCTA';
import { Journal } from '@/components/journal/Journal';
import { Contact } from '@/components/contact/Contact';
import { Footer } from '@/components/footer/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-void text-ivory font-body antialiased">
      <Navigation />
      <Hero />
      <ChaptersLayout />
      <CorporateCTA />
      <Journal />
      <Contact />
      <Footer />
    </div>
  );
}