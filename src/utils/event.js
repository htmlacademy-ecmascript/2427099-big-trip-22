import dayjs from 'dayjs';
import { DateTimeFormat, Time } from '../constants';

const humanizeEventDate = (eventDate) => eventDate ? dayjs(eventDate).format(DateTimeFormat.DATE_FORMAT) : '';

const humanizeEventTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DateTimeFormat.TIME_FORMAT) : '';

const humanizeEventDateTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DateTimeFormat.DATE_TIME_FORMAT) : '';

const getEventDuration = (dateFrom, dateTo) => {
  const durationInMinutes = dayjs(dateTo).diff(dateFrom, 'm');

  const days = Math.floor(durationInMinutes / (Time.HOURS_PER_DAY * Time.MINUTES_PER_HOUR));
  const hours = Math.floor((durationInMinutes % (Time.HOURS_PER_DAY * Time.MINUTES_PER_HOUR)) / Time.MINUTES_PER_HOUR);
  const minutes = durationInMinutes % Time.MINUTES_PER_HOUR;

  let durationString = '';

  if (days > 0) {
    durationString += `${days}D `;
  }

  if (hours > 0) {
    durationString += `${hours}H `;
  }

  if (minutes > 0 || (days === 0 && hours === 0)) {
    durationString += `${minutes}M `;
  }

  return durationString;
};

const isPastDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isBefore(currentDate);
};

const isPresentDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isSame(currentDate, 'day');
};

const isFutureDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isAfter(currentDate);
};

export { humanizeEventDate, humanizeEventTime, humanizeEventDateTime, getEventDuration, isPastDate, isPresentDate, isFutureDate };


