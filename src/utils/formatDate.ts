export const formatDate = (dateToFormat: string, locale: string): string => {
  const date = new Date(dateToFormat);

  if (!dateToFormat) return '';

  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);

  const fullDate = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return `${weekday}, ${fullDate}`;
};
