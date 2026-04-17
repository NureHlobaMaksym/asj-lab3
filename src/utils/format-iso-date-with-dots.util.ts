export const formatIsoDateWithDots = (dateString: string): string => {
  return dateString.split('-').reverse().join('.');
};
