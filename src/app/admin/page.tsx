'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

type MediaItem = {
  id: string;
  title: string;
  url: string;
  section: string;
  type: 'image' | 'video';
  // imgUrl?: string; // تم الحذف
};

const sections = ['Wedding', 'Events', 'Production', 'Company', 'Catering', 'Showreel'];

export default function AdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [form, setForm] = useState<Omit<MediaItem, 'id'>>({
    title: '',
    type: 'image',
    url: '',
    section: '',
    // imgUrl: '', // تم الحذف
  });
  const [message, setMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'media'));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MediaItem[];
      setMedia(items);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const addMedia = async () => {
    if (!form.section) return alert('Please select a section.');
    if (!form.url || !form.title) return alert('Please fill in all fields.');

    const dataToSend: Partial<MediaItem> = {
      title: form.title,
      url: form.url,
      type: form.type,
      section: form.section,
    };

    // if (form.type === 'video' && form.imgUrl) {
    //   dataToSend.imgUrl = form.imgUrl;
    // }

    try {
      const docRef = await addDoc(collection(db, 'media'), dataToSend);
      setMedia((prev) => [...prev, { id: docRef.id, ...form }]);
      setMessage('✅ Media added successfully');
      setForm((prev) => ({
        ...prev,
        title: '',
        url: '',
        // imgUrl: '',
      }));
    } catch (error) {
      console.error('Error adding media:', error);
      setMessage('❌ Failed to add media');
    }
  };

  const deleteMedia = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'media', id));
      setMedia((prev) => prev.filter((item) => item.id !== id));
      setMessage('🗑️ Media deleted');
    } catch (error) {
      console.error('Error deleting media:', error);
      setMessage('❌ Failed to delete');
    }
  };

  const filteredMedia = form.section
    ? media.filter((item) => item.section === form.section)
    : [];

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🎛️ Admin Dashboard</h1>

      {message && (
        <div className="bg-green-700 text-white p-2 px-4 rounded mb-6 text-sm shadow">
          {message}
        </div>
      )}

      {/* 🔧 Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <input
          placeholder="Title"
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Media URL"
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        {/* {form.type === 'video' && (
          <input
            placeholder="Thumbnail Image URL"
            className="p-2 bg-gray-800 rounded text-sm"
            value={form.imgUrl}
            onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
          />
        )} */}
        <select
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
        <select
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as 'image' | 'video' })
          }
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button
          onClick={addMedia}
          className="bg-green-600 px-4 py-2 rounded font-bold hover:bg-green-700 text-sm col-span-1 md:col-span-2 lg:col-span-1 flex items-center justify-center gap-2"
        >
          <FaPlusCircle /> Add Media
        </button>
      </div>

      {/* 🖼️ Media List (without image preview) */}
      <div className="grid gap-4">
        {filteredMedia.length === 0 ? (
          <p className="text-gray-400">
            {form.section
              ? `No media items found for "${form.section}".`
              : 'Select a section to view media.'}
          </p>
        ) : (
          filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-gray-400">
                  {item.section} • {item.type}
                </div>
              </div>
              <button
                onClick={() => deleteMedia(item.id)}
                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
