import HeaderPresenter from './presenter/header-presenter.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import MockService from './service/mock-service.js';
import DestinationModel from './model/destination-model.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const eventPointsModel = new EventPointsModel(mockService);
const offersModel = new OffersModel(mockService);
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({
  headerContainer: siteTripMainElement,
});

const filterPresenter = new FilterPresenter({
  headerContainer: siteTripMainElement,
  eventPointsModel,
  filterModel
});

const newPointButtonPresenter = new NewPointButtonPresenter({
  headerContainer: siteTripMainElement,
});

const tripListPresenter = new TripListPresenter({
  tripContainer: siteTripEventsElement,
  destinationModel,
  eventPointsModel,
  offersModel,
  filterModel,
  newPointButtonPresenter: newPointButtonPresenter
});

export default class BigTripApp {
  init() {
    headerPresenter.init();
    filterPresenter.init();
    newPointButtonPresenter.init({ onButtonClick: tripListPresenter.createPoint});
    tripListPresenter.init();
  }
}
