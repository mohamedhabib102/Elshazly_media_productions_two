'use client';
import React from 'react';

const services = [
  { title: 'Wedding', emoji: '💍' },
  { title: 'Events', emoji: '🎉' },
  { title: 'Production', emoji: '🎬' },
  { title: 'Company', emoji: '🏢' },
  { title: 'Catering', emoji: '🍽️' },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-black text-white text-center">
      <h2 className="text-4xl sm:text-5xl font-bold mb-12">الخدمات</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 md:px-16 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-[#181818] py-10 px-4 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">{service.emoji}</div>
            <div className="font-semibold text-lg sm:text-xl md:text-2xl">{service.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}