import { getTodayDate } from '@/utils/get-today-date.util';
import { parseDate } from '@/utils/parse-date.util';

export const getTodayTimestamp = (): number => {
  return parseDate(getTodayDate());
};
