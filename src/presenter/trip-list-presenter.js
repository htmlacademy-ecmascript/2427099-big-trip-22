import { SortTypes, UpdateType, UserAction, FilterType } from '../constants.js';
import { render, remove } from '../framework/render.js';
import { sorting } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import EmptyEventPointsView from '../view/empty-event-points-view.js';
import TripListView from '../view/trip-list-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class TripListPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #offersModel = null;
  #tripListComponent = new TripListView();
  #emptyEventPointsComponent = null;
  #currentSortType = SortTypes.DAY;
  #pointsPresenter = new Map();
  #sortPresenter = null;
  #isAdditingType = null;
  #newPointPresenter = null;
  #newPointButtonPresenter = null;

  constructor ({
    tripContainer,
    destinationModel,
    eventPointsModel,
    offersModel,
    filterModel,
    newPointButtonPresenter,
  }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#newPointPresenter = new NewPointPresenter({
      tripContainer: this.#tripListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
    });

    this.#eventPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get eventPoints() {
    this.#filterType = this.#filterModel.filter;
    const filteredEventPoints = filter[this.#filterType](this.#eventPointsModel.eventPoints);
    return sorting[this.#currentSortType](filteredEventPoints);
  }

  init() {
    this.#renderTripBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPointsModel.update(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#eventPointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#eventPointsModel.delete(updateType, update);
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

  createPoint = () => {
    this.#isAdditingType = true;
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #handleNewPointDestroy = ({ isCanceled }) => {
    this.#isAdditingType = false;
    this.#newPointButtonPresenter.enableButton();

    if(!this.eventPoints.length && isCanceled) {
      this.#clearTripBoard();
      this.#renderTripBoard();
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearTripBoard();
    this.#renderTripBoard();
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#tripContainer,
      currentSortType: this.#currentSortType,
      sortTypeChangeHandler: this.#handleSortTypeChange
    });

    this.#sortPresenter.init();
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy({ isCanceled: true });
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    this.#sortPresenter.destroy();

    if (this.#emptyEventPointsComponent) {
      remove(this.#emptyEventPointsComponent);
    }

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

    this.#renderSort();

    render(this.#tripListComponent, this.#tripContainer);
    this.#renderPoints(eventPoints);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy({ isCanceled: true });
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoints(eventPoints) {
    eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    this.#emptyEventPointsComponent = new EmptyEventPointsView({filterType: this.#filterType});
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
