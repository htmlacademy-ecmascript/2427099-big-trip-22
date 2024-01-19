import { SortTypes } from '../constants.js';
import { sortByDate, sortByTime, sortByPrice } from './event.js';

const sorting = {
  [SortTypes.DAY]: (points) => [...points].sort(sortByDate),
  [SortTypes.EVENT]: () => {
    throw new Error(`Sort by ${SortTypes.EVENT} is diabled.`);
  },
  [SortTypes.TIME]: (points) => [...points].sort(sortByTime),
  [SortTypes.PRICE]: (points) => [...points].sort(sortByPrice),
  [SortTypes.OFFERS]: () => {
    throw new Error(`Sort by ${SortTypes.OFFERS} is diabled.`);
  }
};

export { sorting };
