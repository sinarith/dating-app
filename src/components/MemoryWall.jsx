import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './MemoryWall.scss';

const DEFAULT_MEMORIES = [
  { id: 'first-conversation', title: 'Our first conversation', image: null },
  { id: 'first-date', title: 'Our first date', image: null },
  { id: 'funniest-moment', title: 'Our funniest moment', image: null },
  { id: 'favorite-photo', title: 'My favorite photo of you', image: null },
  { id: 'never-forget', title: "A moment I'll never forget", image: null },
];

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MemoryWall() {
  const [memories, setMemories] = useLocalStorage('jmy-memories', DEFAULT_MEMORIES);
  const fileInputRefs = useRef({});

  const handleUpload = async (id, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setMemories((prev) =>
        prev.map((memory) => (memory.id === id ? { ...memory, image: dataUrl } : memory))
      );
    } catch {
      // ignore unreadable file
    }
  };

  return (
    <div className="memory-wall">
      <h2 className="section-title">Our Little Memories {'\u2764\ufe0f'}</h2>
      <p className="section-subtitle">Add a photo to each memory to make this wall ours.</p>

      <div className="memory-wall__grid">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="memory-wall__card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
          >
            <div className="memory-wall__image-wrap">
              {memory.image ? (
                <img src={memory.image} alt={memory.title} />
              ) : (
                <div className="memory-wall__placeholder">{'\ud83d\udcf7'}</div>
              )}
            </div>
            <p className="memory-wall__title">{memory.title}</p>
            <button
              type="button"
              className="btn btn-ghost memory-wall__upload-btn"
              onClick={() => fileInputRefs.current[memory.id]?.click()}
            >
              {memory.image ? 'Change photo' : 'Add photo'}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={(el) => {
                fileInputRefs.current[memory.id] = el;
              }}
              onChange={(event) => handleUpload(memory.id, event)}
              className="visually-hidden"
              aria-label={`Upload photo for ${memory.title}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
