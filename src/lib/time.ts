import type { Locale } from 'i18n/types';
import readingTime from 'reading-time';

export function getReadTime(content: string, locale: Locale = 'en') {
  const minutes = readingTime(content).minutes;
  const displayed = Math.ceil(parseFloat(minutes.toFixed(2)));
  return locale === 'en'
    ? `${displayed} min read`
    : `${displayed} min de leitura`;
}
