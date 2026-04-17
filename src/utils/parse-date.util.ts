export const parseDate = (dateString: string): number => {
  return new Date(`${dateString}T00:00:00`).getTime();
};
