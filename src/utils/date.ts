export function getFormatedDate(date: string) {
  return new Date(date + 'GMT-0700').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
