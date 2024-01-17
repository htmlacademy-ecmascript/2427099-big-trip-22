import HeaderPresenter from '../presenter/header-presenter.js';
import TripListPresenter from './trip-list-presenter.js';
import MockService from '../service/mock-service.js';
import DestinationModel from '../model/destination-model.js';
import EventPointsModel from '../model/event-points-model.js';
import OffersModel from '../model/offers-model.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const eventPointsModel = new EventPointsModel(mockService);
const offersModel = new OffersModel(mockService);

const headerPresenter = new HeaderPresenter({
  headerContainer: siteTripMainElement,
  eventPointsModel
});

const tripListPresenter = new TripListPresenter({
  tripContainer: siteTripEventsElement,
  destinationModel,
  eventPointsModel,
  offersModel
});

export default class MainPresenter {
  init() {
    headerPresenter.init();
    tripListPresenter.init();
  }
}
