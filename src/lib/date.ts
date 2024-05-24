import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export function getFormatedDate(date: string, time: boolean = false) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (time) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
    options.hour12 = false;
  }

  return new Date(date).toLocaleDateString('en-US', options);
}

export function getDateAgo(date: string) {
  return timeAgo.format(new Date(date));
}