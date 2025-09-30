'use client';

import { useState } from 'react';

export default function useTranslate(apiKey: string) {
  const [loading, setLoading] = useState(false);

  const translate = async (text: string, targetLang: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
          }),
        }
      );

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Возвращаем оригинальный текст в случае ошибки
    } finally {
      setLoading(false);
    }
  };

  return { translate, loading };
}
