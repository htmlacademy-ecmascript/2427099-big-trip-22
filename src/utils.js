import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT, HOURS_PER_DAY, MINUTES_PER_HOUR } from './constants';

const createIdGenerator = (startFrom) => {
  let generatorId = startFrom;
  return function() {
    return ++generatorId;
  };
};

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizeEventDate = (eventDate) => eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';

const humanizeEventTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(TIME_FORMAT) : '';

const humanizeEventDateTime = (eventDateTime) => eventDateTime ? dayjs(eventDateTime).format(DATE_TIME_FORMAT) : '';

const getEventDuration = (dateFrom, dateTo) => {
  const durationInMinutes = dayjs(dateTo).diff(dateFrom, 'm');

  const days = Math.floor(durationInMinutes / (HOURS_PER_DAY * MINUTES_PER_HOUR));
  const hours = Math.floor((durationInMinutes % (HOURS_PER_DAY * MINUTES_PER_HOUR)) / MINUTES_PER_HOUR);
  const minutes = durationInMinutes % MINUTES_PER_HOUR;

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

export {
  createIdGenerator,
  getRandomArrayElement,
  getRandomInteger,
  humanizeEventDate,
  humanizeEventTime,
  humanizeEventDateTime,
  getEventDuration
};
