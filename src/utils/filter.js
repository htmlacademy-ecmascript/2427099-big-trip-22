import dayjs from 'dayjs';
import { FilterType } from '../constants';

const isPastDate = (point) => dayjs().isAfter(point.dateFrom);

const isPresentDate = (point) => dayjs().isSame(point.dateFrom);

const isFutureDate = (point) => dayjs().isBefore(point.dateFrom);

const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => [...eventPoints],
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter(isFutureDate),
  [FilterType.PRESENT]: (eventPoints) => eventPoints.filter(isPresentDate),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter(isPastDate),
};

export { filter };
