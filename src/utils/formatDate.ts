export const formatDate = (dateToFormat: string, locale: string): string => {
  const date = new Date(dateToFormat);

  if (!dateToFormat) return '';

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);
};
