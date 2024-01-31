import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripHeaderInfoView from '../view/trip-header-info-view.js';
import { sorting } from '../utils/sort.js';
import { SortTypes } from '../constants.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripHeaderInfoComponent = null;
  #eventPointsModel = null;
  #offersModel = null;
  #destinationModel = null;
  #offers = [];
  #destinations = [];

  constructor({ headerContainer, eventPointsModel, offersModel, destinationModel }) {
    this.#headerContainer = headerContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#eventPointsModel.addObserver(this.#handleModeChange);
  }

  init () {
    this.#renderHeaderTripInfo();
  }

  #renderHeaderTripInfo(){
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;
    const eventPoints = sorting[SortTypes.DAY](this.#eventPointsModel.eventPoints);

    if (eventPoints.length) {
      const prevHeaderInfoComponent = this.#tripHeaderInfoComponent;
      this.#tripHeaderInfoComponent = new TripHeaderInfoView({
        tripRoute:this.#showTripRoute(eventPoints),
        eventDate: this.#showEventDate(eventPoints),
        totalPrice: this.#calculateTotalPrice(eventPoints)
      });

      if (prevHeaderInfoComponent === null) {
        render(this.#tripHeaderInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
        return;
      }

      replace(this.#tripHeaderInfoComponent, prevHeaderInfoComponent);
      remove(prevHeaderInfoComponent);
    } else {
      remove(this.#tripHeaderInfoComponent);
      this.#tripHeaderInfoComponent = null;
    }
  }

  #calculateTotalOffersPrice(type, selectedOfferIds) {
    const selectedOffers = this.#offers
      .find((offer) => offer.type === type)
      .offers
      .filter((offer) => selectedOfferIds.includes(offer.id));
    const totalOffersPrice = selectedOffers.reduce((total, offer) => total + offer.price, 0);
    return totalOffersPrice;
  }

  #calculateTotalPrice(points){
    return points.reduce((total, point) => {
      total += point.basePrice + this.#calculateTotalOffersPrice(point.type, point.offers);
      return total;
    }, 0);
  }

  #showEventDate(points) {
    return {
      startDate: points[0].dateFrom,
      endDate: points[points.length - 1].dateTo
    };
  }

  #showTripRoute(points) {
    const destinationIds = points.map((point) => point.destination);

    const destinations = destinationIds.map((id) => {
      const destination = this.#destinations.find((dest) => dest.id === id);
      return destination ? destination.name : '';
    });

    let route = '';

    if (destinations.length > 3) {
      route = `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
    } else {
      route = destinations.join(' &mdash; ');
    }

    return route;
  }

  #handleModeChange = () => {
    this.init();
  };
}
