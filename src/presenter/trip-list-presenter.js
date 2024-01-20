import { SortTypes, UpdateType, UserAction } from '../constants.js';
import { render, remove } from '../framework/render.js';
import { sorting } from '../utils/sort.js';
import EmptyEventPointsView from '../view/empty-event-points-view.js';
import TripListView from '../view/trip-list-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';

export default class TripListPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #tripListComponent = new TripListView();
  #emptyEventPointsComponent = new EmptyEventPointsView();
  #currentSortType = SortTypes.DAY;
  #pointsPresenter = new Map();

  constructor ({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;

    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get eventPoints() {
    return sorting[this.#currentSortType](this.#eventPointsModel.eventPoints);
  }

  init() {
    this.#renderSort();
    this.#renderTripBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#eventPointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#eventPointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard();
        this.#renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearTripBoard({ resetSortType: true });
        this.#renderTripBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearTripBoard();
    this.#renderTripBoard();
  };

  #renderSort() {
    const sortPresenter = new SortPresenter({
      container: this.#tripContainer,
      currentSortType: this.#currentSortType,
      sortTypeChangeHandler: this.#handleSortTypeChange
    });

    sortPresenter.init();
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    remove(this.#emptyEventPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #renderTripBoard() {
    const eventPoints = this.eventPoints;

    if (!eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    render(this.#tripListComponent, this.#tripContainer);
    this.#renderPoints(eventPoints);
  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoints(eventPoints) {
    eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    render(this.#emptyEventPointsComponent, this.#tripContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }
}
