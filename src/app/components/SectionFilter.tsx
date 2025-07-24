'use client';

import { useEffect, useState } from "react";
import { FaPlayCircle, FaTimesCircle, FaPhotoVideo } from "react-icons/fa";
import { MediaItem } from "../lib/media";

const sections = ['Wedding', 'Events', 'Production', 'Company', 'Catering', 'Showreel'];

const getYouTubeEmbedUrl = (url: string): string => {
  const shortMatch = url.match(/youtu\.be\/([^\?&]+)/);
  const longMatch = url.match(/youtube\.com\/watch\?v=([^\?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^\?&]+)/);
  const id = shortMatch?.[1] || longMatch?.[1] || embedMatch?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

// دالة لاستخراج صورة مصغرة من رابط يوتيوب
const getYouTubeThumbnail = (url: string): string => {
  const shortMatch = url.match(/youtu\.be\/([^\?&]+)/);
  const longMatch = url.match(/youtube\.com\/watch\?v=([^\?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^\?&]+)/);
  const id = shortMatch?.[1] || longMatch?.[1] || embedMatch?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '/file.svg';
};

export default function MediaGallery() {
  const [selectedSection, setSelectedSection] = useState("Wedding");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/media?section=${selectedSection}`);
        const data = await res.json();
        setMedia(data);
      } catch (error) {
        console.error("❌ Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [selectedSection]);

  return (
    <>
      {/* ✅ Section Filter */}
      <div className="flex flex-wrap gap-3 justify-center my-8 py-4 rounded-lg shadow-lg">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-4 py-2 rounded-lg font-medium border transition duration-200 ${
              selectedSection === section
                ? 'bg-yellow-400 text-black border-yellow-500 scale-105 shadow-lg'
                : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* ✅ Media Grid */}
      <section className="px-6 sm:px-12 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center border-l-4 border-yellow-400 pl-4 flex items-center justify-center gap-2">
          <FaPhotoVideo className="text-yellow-400" /> قسم: {selectedSection}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-center text-gray-400 col-span-full">جاري تحميل المحتوى...</p>
          ) : media.length > 0 ? (
            media.map((item) => (
              <div key={item.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                  {item.type === 'image' ? (
                    <FaPhotoVideo className="text-blue-400" />
                  ) : (
                    <FaPlayCircle className="text-red-500" />
                  )}
                  {item.title}
                </h3>

                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-60 object-cover rounded"
                  />
                ) : (
                  <div
                    onClick={() => setSelectedVideo(item)}
                    className="relative w-full h-60 cursor-pointer group overflow-hidden rounded border border-gray-600"
                  >
                    <img
                      src={getYouTubeThumbnail(item.url)}
                      alt={item.title}
                      className="w-full h-full object-cover  relative z-30 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition">
                      <FaPlayCircle className="text-white text-5xl opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full flex justify-center items-center gap-2">
              <FaTimesCircle /> لا يوجد محتوى
            </p>
          )}
        </div>
      </section>

      {/* ✅ Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
          <div className="relative max-w-4xl w-full aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo.url)}
              title={selectedVideo.title}
              className="w-full h-full rounded-lg shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
            ></iframe>

            <button
              onClick={() => setSelectedVideo(null)}
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
