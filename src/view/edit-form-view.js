import { createElement } from '../render.js';
import { humanizeEventDateTime } from '../utils.js';
import { EVENT_TYPES } from '../constants.js';

const BLANK_EVENT = {
  'basePrice': 0,
  'dateFrom': new Date().toISOString(),
  'dateTo': new Date().toISOString(),
  'destination': '',
  isFavorite: false,
  offers: [],
  type: 'Flight'
};

function createOfferTemplate(offersByType) {
  return offersByType.offers.map(({ id, title, price }) => (
    `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${title}-${id}"
        type="checkbox"
        name="event-offer-${title}"
        checked
      >
      <label class="event__offer-label" for="event-offer-${title}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
    `
  )).join('');
}

function createEventTypeTemplate(eventTypes, eventPointType) {
  return eventTypes.map((type) => (
    `
    <div class="event__type-item">
      <input
        id="event-type-${type.toLowerCase()}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type.toLowerCase()}"
        ${type === eventPointType ? 'checked' : ''}
      >
      <label
        class="event__type-label event__type-label--${type.toLowerCase()}"
        for="event-type-${type.toLowerCase()}-1"
      >
        ${type}
      </label>
    </div>
    `
  )).join('');
}

function createDestinationOptionTemplate(destinations) {
  return destinations.map((destination) => (
    `
    <option value="${destination.name}"></option>
    `
  )).join('');
}

function createEditFormTemplate(destinations, eventPoints, offers) {
  const { type, basePrice, dateFrom, dateTo } = eventPoints;
  const destinationItem = destinations.find((destination) => destination.id === eventPoints.destination);
  const { id, name, description } = destinationItem;
  const offersByType = offers.find((offer) => offer.type === type);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${createEventTypeTemplate(EVENT_TYPES, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationOptionTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDateTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDateTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${offersByType.offers.length ? `
          <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOfferTemplate(offersByType)}
          </div>
          </section>
        ` : ''}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditFormView {
  constructor({ destinations, eventPoints = BLANK_EVENT, offers = [] }) {
    this.destinations = destinations;
    this.eventPoints = eventPoints;
    this.offers = offers;
  }

  getTemplate() {
    return createEditFormTemplate(this.destinations, this.eventPoints, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
