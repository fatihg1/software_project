import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGoogleTranslate } from './useGoogleTranslate';
import { useLanguage } from './LanguageContext';

const AnnouncementsContext = createContext();

export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const { language } = useLanguage();
  const translate = useGoogleTranslate();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await fetch('http://localhost:8080/announcements');
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();

        if (language === 'tr') {
          // Translate all announcements
          const translated = await Promise.all(
            data.map(async (ann) => {
              const [title, content] = await Promise.all([
                translate(ann.title),
                translate(ann.content)
              ]);
              return { ...ann, title, content };
            })
          );

          console.log('Setting translated announcements:', translated);
          if (isMounted) setAnnouncements(translated);
        } else {
          console.log('Setting raw announcements:', data);
          if (isMounted) setAnnouncements(data);
        }
      } catch (err) {
        console.error('Error loading announcements:', err);
        if (isMounted) setAnnouncements([]);
      }
    })();

    return () => { isMounted = false; };
  }, [language, translate]);

  return (
    <AnnouncementsContext.Provider value={{ announcements }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};

export const useAnnouncements = () => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  }
  return context;
};
