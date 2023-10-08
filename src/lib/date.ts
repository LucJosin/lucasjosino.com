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
