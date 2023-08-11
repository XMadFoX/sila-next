import { atom } from 'nanostores';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const $selectedDate = atom<Date>(today);
