import { useRef, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

/**
 * Hook to translate text via Google's public web Translate endpoint.
 * Only translates when current language is 'tr'.
 */
export function useGoogleTranslate() {
  const { language: target } = useLanguage();
  const cache = useRef({});

  const translateText = useCallback(async (sourceText) => {
    if (target !== 'tr' || !sourceText) {
      return sourceText;
    }

    const cacheKey = `${sourceText}::${target}`;
    if (cache.current[cacheKey]) {
      console.debug('🔁 cache hit:', sourceText, '→', cache.current[cacheKey]);
      return cache.current[cacheKey];
    }

    try {
      const params = new URLSearchParams({
        client: 'dict-chrome-ex',
        sl: 'auto',
        tl: target,
        q: sourceText
      });

      const url = `https://clients5.google.com/translate_a/t?${params.toString()}`;
      console.debug('🌐 calling translate URL:', url);
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        console.error('❌ Translation API error:', response.status, response.statusText);
        return sourceText;
      }

      // Make sure we get JSON
      const data = await response.json();
      console.debug('📥 raw translate payload:', data);

      // Based on your network response format, extract the translation properly
      let translated;
      
      if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
        // Format appears to be [["translation","source language"]]
        translated = data[0][0];
      } else if (Array.isArray(data.sentences)) {
        // Original format: Extract and concat all sentence.trans fields
        translated = data.sentences.map(seg => seg.trans).join('');
      } else {
        // Fallback
        translated = sourceText;
      }

      console.debug('✅ translated:', sourceText, '→', translated);
      cache.current[cacheKey] = translated;
      return translated;
    } catch (error) {
      console.error('🚨 Translation request failed:', error);
      return sourceText;
    }
  }, [target]);

  return translateText;
}