'use client';
import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-24 px-4 bg-black text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-10">من نحن</h2>
        <p className="text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto text-gray-200 font-normal leading-relaxed">
          بتحوّل فكرتك لصورة احترافية.<br/>
          من التصوير للإنتاج، بننفذ كل حاجة بإبداع ودقّة.<br/>
          رؤيتك… نخلقها بصريًا.
        </p>
      </div>
    </section>
  );
}
