import { getTodayTimestamp } from '@/utils/get-today-timestamp.util';
import { parseDate } from '@/utils/parse-date.util';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const getDaysDifference = (deadlineString: string): number => {
  const deadlineTimestamp = parseDate(deadlineString);
  const todayTimestamp = getTodayTimestamp();
  return Math.ceil((deadlineTimestamp - todayTimestamp) / DAY_IN_MILLISECONDS);
};
