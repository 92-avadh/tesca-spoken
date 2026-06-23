'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, LogIn } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/data/content';
import { useDemoModal } from '@/context/DemoModalContext';
import { motion } from 'framer-motion';
import { StaggeredMenu } from './ui/StaggeredMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { openModal } = useDemoModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const mobileItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About Us', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Courses', ariaLabel: 'View our courses', link: '/courses' },
    { label: 'Pricing', ariaLabel: 'Check pricing', link: '/pricing' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    { label: 'Book Free Demo', ariaLabel: 'Book a free demo class', onClick: openModal },
    { label: 'Login', ariaLabel: 'Login to student portal', link: '/login' },
    { label: 'WhatsApp Us', ariaLabel: 'Chat with us on WhatsApp', link: WHATSAPP_URL },
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'YouTube', link: 'https://youtube.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 hidden lg:block ${
          scrolled
            ? 'bg-white border-b border-black/5 shadow-soft'
            : 'bg-transparent'
        }`}
        style={{ top: 'var(--banner-height, 36px)' }}
      >
        <nav className="container-x flex h-14 items-center justify-between py-2 lg:h-16">
          <Link href="/" className="group flex items-center gap-2" aria-label="TESCA home">
            <img src="/Tesca_logo.png" alt="TESCA Logo" className="h-8 lg:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
          </Link>

          {/* Desktop nav */}
          <ul 
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    className={`group relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-ink-soft hover:text-primary'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {hoveredLink === link.href && (
                      <motion.span
                        layoutId="nav-hover-backdrop"
                        className="absolute inset-0 bg-primary-50 rounded-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <button onClick={openModal} className="btn-warm text-sm cursor-pointer">
              <CalendarCheck className="h-4 w-4" />
              Book Free Demo
            </button>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed={true}
          position="right"
          logoUrl="/Tesca_logo.png"
          colors={['#b3e5e6', '#067779']}
          accentColor="#F97823"
          items={mobileItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#1A1A1A"
          openMenuButtonColor="#1A1A1A"
          onMenuOpen={() => setMobileMenuOpen(true)}
          onMenuClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </>
  );
}
