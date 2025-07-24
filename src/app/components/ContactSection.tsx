'use client';
import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const links = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/201234567890',
    icon: <FaWhatsapp />,
    color: 'text-green-500',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/yourpage',
    icon: <FaFacebookF />,
    color: 'text-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourpage',
    icon: <FaInstagram />,
    color: 'text-pink-500',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@yourpage',
    icon: <FaTiktok />,
    color: 'text-white',
  },
];

export default function ContactSection() {
  // استخراج رابط الواتساب فقط
  const whatsapp = links.find((l) => l.name === 'WhatsApp');
  const socials = links.filter((l) => l.name !== 'WhatsApp');
  return (
    <>
      <section className="py-24 bg-black text-white text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">تواصل معانا على السوشيال</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {socials.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#181818] flex flex-col items-center justify-center hover:bg-gray-800 transition"
            >
              <div className={`text-3xl sm:text-4xl md:text-5xl mb-2 ${link.color}`}>{link.icon}</div>
              <span className="text-sm sm:text-base md:text-lg font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </section>
      {/* زر واتساب عائم */}
      {whatsapp && (
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center p-5 text-3xl transition-all duration-200"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', width: '64px', height: '64px' }}
        >
          <whatsapp.icon.type />
        </a>
      )}
    </>
  );
}
