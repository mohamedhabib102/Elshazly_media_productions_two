'use client';

import { useEffect, useState } from 'react';
import { MediaItem } from '../lib/media';
import {
  FaPlayCircle,
  FaTimesCircle,
  FaPhotoVideo,
} from 'react-icons/fa';

const getYouTubeEmbedUrl = (url: string): string => {
  const patterns = [
    /youtu\.be\/([^\?&]+)/,
    /youtube\.com\/watch\?v=([^\?&]+)/,
    /youtube\.com\/embed\/([^\?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }

  return url;
};

// دالة جديدة لاستخراج صورة مصغرة من رابط يوتيوب
const getYouTubeThumbnail = (url: string): string => {
  const patterns = [
    /youtu\.be\/([^\?&]+)/,
    /youtube\.com\/watch\?v=([^\?&]+)/,
    /youtube\.com\/embed\/([^\?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return '/file.svg'; // صورة افتراضية إذا لم يكن الرابط يوتيوب
};

export default function MediaSection() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  const section = 'Wedding';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`api/media?section=${section}`);
        const data = await res.json();
        setMedia(data);
      } catch (err) {
        console.error('❌ Error fetching media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section]);

  const handleCloseVideo = () => setSelectedVideo(null);

  return (
    <>
      <section className="px-6 sm:px-12 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center border-l-4 border-yellow-400 pl-4 flex items-center justify-center gap-2">
          <FaPhotoVideo className="text-yellow-400" /> قسم: {section}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-center text-gray-400 col-span-full">
              جاري تحميل المحتوى...
            </p>
          ) : media.length > 0 ? (
            media.map((item) => (
              <div
                key={item.id}
                className="aspect-square bg-gray-900 rounded-xl shadow-lg overflow-hidden group cursor-pointer flex items-center justify-center"
                onClick={item.type === 'video' ? () => setSelectedVideo(item) : undefined}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={getYouTubeThumbnail(item.url)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black bg-opacity-40 rounded-full p-4 flex items-center justify-center transition-transform group-hover:scale-110">
                        <FaPlayCircle className="text-white text-4xl opacity-90" />
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full flex justify-center items-center gap-2">
              <FaTimesCircle /> لا يوجد محتوى حاليًا لهذا القسم.
            </p>
          )}
        </div>
      </section>

      {/* ✅ Modal Video Player */}
      {selectedVideo && selectedVideo.type === 'video' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4"
          onClick={handleCloseVideo}
        >
          <div
            className="relative max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()} // منع الغلق عند الضغط داخل الفيديو
          >
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo.url)}
              title={selectedVideo.title}
              className="w-full h-full rounded-lg shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
            ></iframe>

            <button
              onClick={handleCloseVideo}
              className="absolute -top-6 -right-6 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
            >
              <FaTimesCircle className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
