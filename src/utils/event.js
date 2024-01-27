import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateTimeFormat, Time } from '../constants';

dayjs.extend(duration);

const humanizeEventDate = (eventDate) => eventDate ? dayjs(eventDate).format(DateTimeFormat.DATE_FORMAT) : '';

const humanizeEventTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DateTimeFormat.TIME_FORMAT) : '';

const humanizeEventDateTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DateTimeFormat.DATE_TIME_FORMAT) : '';

const getEventDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  if (diff >= Time.MINUTES_PER_DAY) {
    return dayjs.duration(diff, 'm').format('DD[D] HH[H] mm[M]');
  }

  if (diff >= Time.MINUTES_PER_HOUR) {
    return dayjs.duration(diff, 'm').format('HH[H] mm[M]');
  }

  if (diff < Time.MINUTES_PER_HOUR) {
    return dayjs.duration(diff, 'm').format('mm[M]');
  }
};

const isMinorChange = (eventA, eventB) =>
  eventA.dateFrom !== eventB.dateFrom ||
  eventA.basePrice !== eventB.basePrice ||
  getEventDuration(eventA.dateFrom, eventA.dateTo) !== getEventDuration(eventB.dateFrom, eventB.dateTo);

export {
  humanizeEventDate,
  humanizeEventTime,
  humanizeEventDateTime,
  getEventDuration,
  isMinorChange
};


