import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateTimeFormat, Time } from '../constants';

dayjs.extend(duration);

const humanizeEventDate = (eventDate) => eventDate ? dayjs(eventDate).format(DateTimeFormat.DATE_FORMAT) : '';

const humanizeHeaderEventDate = (eventDate) => eventDate ? dayjs(eventDate).format(DateTimeFormat.HEADER_DATE_FORMAT) : '';

const humanizeEventTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DateTimeFormat.TIME_FORMAT) : '';

const humanizeEventDateTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DateTimeFormat.DATE_TIME_FORMAT) : '';

const getEventDuration = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  const days = Math.floor(diffInMinutes / Time.MINUTES_PER_DAY);
  const hours = Math.floor((diffInMinutes % Time.MINUTES_PER_DAY) / Time.MINUTES_PER_HOUR);
  const minutes = diffInMinutes % Time.MINUTES_PER_HOUR;

  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  if (diffInMinutes >= Time.MINUTES_PER_DAY) {
    return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
  }

  if (diffInMinutes >= Time.MINUTES_PER_HOUR) {
    return `${formattedHours}H ${formattedMinutes}M`;
  }

  if (diffInMinutes < Time.MINUTES_PER_HOUR) {
    return `${formattedMinutes}M`;
  }
};

const isMinorChange = (eventA, eventB) =>
  eventA.dateFrom !== eventB.dateFrom ||
  eventA.basePrice !== eventB.basePrice ||
  getEventDuration(eventA.dateFrom, eventA.dateTo) !== getEventDuration(eventB.dateFrom, eventB.dateTo);

export {
  humanizeEventDate,
  humanizeHeaderEventDate,
  humanizeEventTime,
  humanizeEventDateTime,
  getEventDuration,
  isMinorChange
};


