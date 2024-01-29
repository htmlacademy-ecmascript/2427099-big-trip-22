import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizeEventDateTime } from '../utils/event.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { EVENT_TYPES, Mode, EMPTY_POINT } from '../constants.js';

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

function createPictureTemplate(pictures) {
  return pictures.map((picture) => (
    `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `
  )).join('');
}

function rollupTemplate() {
  return (
    `
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    `
  );
}

function createOffersSectionTemplate(isOffers, offersByType, offers) {
  return isOffers ? `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOfferTemplate(offersByType, offers)}
      </div>
    </section>
  ` : '';
}

function createDestinationInfoTemplate(isDestination, destination) {
  return isDestination ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPictureTemplate(destination.pictures)}
        </div>
      </div>
    </section>` : '';
}

function createEditFormTemplate({destinations, state, offers, modeType}) {
  const isAdditingType = modeType === Mode.ADDITING;
  const { type, basePrice, dateFrom, dateTo } = state;
  const destination = destinations.find((item) => item.id === state.destination);
  const offersByType = offers.find((item) => item.type === type).offers;
  const isOffers = offersByType.length > 0;
  const isDestination = destination?.pictures.length > 0 && destination?.description.trim().length > 0;

  let buttonText;
  if (isAdditingType) {
    buttonText = 'Cancel';
  } else if (state.isDeleting) {
    buttonText = 'Deleting...';
  } else {
    buttonText = 'Delete';
  }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createEventTypeTemplate(type)}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${he.encode(destination?.name ?? '')}"
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${createDestinationOptionsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${isAdditingType ? '' : humanizeEventDateTime(dateFrom)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${isAdditingType ? '' : humanizeEventDateTime(dateTo)}"
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="number"
              min="1"
              name="event-price"
              value="${basePrice}"
              pattern="^[0-9]+$"
            >
          </div>

          <button
            class="event__save-btn  btn  btn--blue"
            type="submit"
            ${state.isDisabled ? 'disabled' : ''}
          >${state.isSaving ? 'Saving...' : 'Save'}</button>
          <button
            class="event__reset-btn"
            type="reset"
            ${state.isDisabled ? 'disabled' : ''}
          >${buttonText}</button>
          ${isAdditingType ? '' : rollupTemplate()}
        </header>
        <section class="event__details">
          ${createOffersSectionTemplate(isOffers, offersByType, state.offers)}
          ${createDestinationInfoTemplate(isDestination, destination)}
        </section>
      </form>
    </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #onCloseClick = null;
  #onFormSubmit = null;
  #onDeleteClick = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #modeType = null;

  constructor({
    eventPoint = EMPTY_POINT,
    destinations,
    offers,
    onCloseClick,
    onFormSubmit,
    onDeleteClick,
    modeType = Mode.EDITING,
  }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onCloseClick = onCloseClick;
    this.#onFormSubmit = onFormSubmit;
    this.#onDeleteClick = onDeleteClick;
    this.#modeType = modeType;

    this._setState(PointEditView.parsePointToState(eventPoint));
    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate({
      destinations: this.#destinations,
      state: this._state,
      offers: this.#offers,
      modeType: this.#modeType,
    });
  }

  removeElement() {
    super.removeElement();
    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }
    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    if (this.#modeType === Mode.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseClick);
    }
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitEditFormHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeOptionHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationOptionHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    this.#setDatePickers();
  }

  #submitEditFormHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #pointDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #typeOptionHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: []});
  };

  #destinationOptionHandler = (evt) => {
    const selectedDestination = this.#destinations.find((item) => item.name === evt.target.value);
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;
    this.updateElement({destination: selectedDestinationId});
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({offers: selectedOffers.map((offer) => offer.dataset.offerId)});
  };

  #priceInputHandler = (evt) => {
    this._setState({basePrice: +evt.target.value});
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({dateFrom: userDate});
    this.#datePickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({dateTo: userDate});
    this.#datePickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatePickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const dateConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datePickerFrom = flatpickr(
      dateFromElement,
      {
        ...dateConfig,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      },
    );

    this.#datePickerTo = flatpickr(
      dateToElement,
      {
        ...dateConfig,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      },
    );
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
