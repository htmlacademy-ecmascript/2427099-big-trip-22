import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import DestinationModel from './model/destination-model.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');

const destinationModel = new DestinationModel();
const eventPointsModel = new EventPointsModel();
const offersModel = new OffersModel();

const headerPresenter = new HeaderPresenter({
  headerContainer: siteTripMainElement
});

const tripPresenter = new TripPresenter({
  tripContainer: siteTripEventsElement,
  destinationModel,
  eventPointsModel,
  offersModel
});

headerPresenter.init();
tripPresenter.init();
