import HeaderPresenter from './presenter/header-presenter.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import DestinationModel from './model/destination-model.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointApiService from './service/point-api-service.js';
import { BASE_URL, AUTHORIZATION } from './constants.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.page-body__page-main .page-body__container');

const service = new PointApiService(BASE_URL, AUTHORIZATION);
const destinationModel = new DestinationModel(service);
const offersModel = new OffersModel(service);
const eventPointsModel = new EventPointsModel({
  service,
  destinationModel: destinationModel,
  offersModel: offersModel,
});
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({
  headerContainer: siteTripMainElement,
  eventPointsModel: eventPointsModel,
  offersModel: offersModel,
  destinationModel: destinationModel
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
    tripListPresenter.init();
    newPointButtonPresenter.init({ onButtonClick: tripListPresenter.createPoint});
    eventPointsModel.init();
  }
}
