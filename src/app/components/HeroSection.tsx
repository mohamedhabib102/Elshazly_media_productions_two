'use client';

import React from 'react';
import { FaPlayCircle } from 'react-icons/fa'; // ✅ استيراد الأيقونة

export default function HeroSection() {
  return (
    <section className="relative text-center py-32 bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* خلفيات دائرية متحركة */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 opacity-10 blur-3xl rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full animate-pulse -z-10" />
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8">
        {/* شعار داخل دائرة */}
        <div className="w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center rounded-full bg-white/10 shadow-2xl border-4 border-white/20 mb-2">
          <img
            src="/V-removebg-preview.png"
            alt="لوجو Elshazly Media Productions"
            className="w-32 sm:w-44 drop-shadow-xl"
          />
        </div>
        {/* نص ترحيبي */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          Elshazly Media Productions
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-2 font-medium max-w-xl">
          بنصنع لحظات لا تُنسى، ونحولها لقصص حقيقية تلمس القلوب وتتشاف بوضوح.
        </p>
        {/* زر بارز */}
        <a
          href="#showreel"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:from-yellow-300 hover:to-pink-300 transition-all duration-200 border-2 border-white/30"
        >
          <span className="animate-pulse"><FaPlayCircle className="text-2xl" /></span>
          شوف شغلنا
        </a>
      </div>
    </section>
  );
}
