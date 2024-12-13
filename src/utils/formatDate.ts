export const formatDate = (dateToFormat: string): string =>
  new Date(dateToFormat).toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    weekday: 'long',
  });
