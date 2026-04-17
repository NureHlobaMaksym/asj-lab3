export const formatShortDate = (dateString: string): string => {
  const [, month, day] = dateString.split('-');
  return `${day}.${month}`;
};
