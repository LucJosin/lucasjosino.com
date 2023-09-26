import readingTime from 'reading-time';

export function getReadTime(content: string) {
  return readingTime(content).text;
}
