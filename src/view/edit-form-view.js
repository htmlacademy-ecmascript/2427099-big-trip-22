import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEventDateTime } from '../utils/event.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { EVENT_TYPES } from '../constants.js';

function createOfferTemplate(offers, selectedOffers) {
  return offers.map(({ id, title, price }) => (
    `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${title}-${id}"
        type="checkbox"
        name="event-offer-${title}"
        data-offer-id="${id}"
        ${selectedOffers.includes(id) ? 'checked' : ''}
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

function createEventTypeListTemplate(eventPointType) {
  return EVENT_TYPES.map((type) => (
    `
    <div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${type === eventPointType ? 'checked' : ''}
      >
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
      >
        ${capitalizeFirstLetter(type)}
      </label>
    </div>
    `
  )).join('');
}

function createEventTypeTemplate(eventType) {
  return (
    `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${createEventTypeListTemplate(eventType)}
        </fieldset>
      </div>
    </div>
    `
  );
}

function createDestinationOptionsTemplate(destinations) {
  return destinations.map((destination) => (
    `
    <option value="${destination.name}"></option>
    `
  )).join('');
}

function createEditFormTemplate(destinations, destination, eventPoint, offers) {
  const { type, basePrice, dateFrom, dateTo } = eventPoint;
  const { id, name, description } = destination;
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createEventTypeTemplate(type)}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationOptionsTemplate(destinations)}
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
        ${offers.length ? `
          <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOfferTemplate(offers, eventPoint.offers)}
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

export default class EditFormView extends AbstractStatefulView {
  #destinations = [];
  #destination = null;
  #offers = [];
  #onCloseClick = null;
  #onFormSubmit = null;

  constructor({ destinations, destination, eventPoint, offers, onCloseClick, onFormSubmit }) {
    super();
    this._setState(EditFormView.parsePointToState(eventPoint));
    this.#destinations = destinations;
    this.#destination = destination;
    this.#offers = offers;
    this.#onCloseClick = onCloseClick;
    this.#onFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this.#destinations, this.#destination, this._state, this.#offers);
  }

  reset(point) {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseClick);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitEditFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeOptionHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationOptionHandler);
    const offersElement = this.element.querySelector('.event__available-offers');
    if (offersElement) {
      offersElement.addEventListener('change', this.#offersChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
  }

  #submitEditFormHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #typeOptionHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: []});
  };

  #destinationOptionHandler = (evt) => {
    const selectedDestination = this.#destinations.find((item) => item.name === evt.target.value);
    this.updateElement({destination: selectedDestination.id});
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({offers: selectedOffers.map((offer) => offer.dataset.offerId)});
  };

  #priceInputHandler = (evt) => {
    this._setState({basePrice: +evt.target.value});
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
