import { addDays } from 'date-fns';
import { atom } from 'nanostores';

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = addDays(today, 1);
export { today, tomorrow };

export const $selectedDate = atom<Date>(today);
