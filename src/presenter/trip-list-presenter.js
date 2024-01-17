import { SortTypes } from '../constants.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortByTime, sortByPrice, sortByDate } from '../utils/event.js';
import EmptyEventPointsView from '../view/empty-event-points-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointPresenter from './point-presenter.js';

export default class TripListPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #tripListComponent = new TripListView();
  #sortComponent = null;
  #currentSortType = SortTypes[0].type;
  #eventPoints = [];
  #pointsPresenter = new Map();

  constructor ({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.eventPoints];

    if (!this.#eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  }

  #handleDataChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortEventPoints(sortType) {
    switch(sortType) {
      case 'day':
        this.#eventPoints.sort(sortByDate);
        break;
      case 'time':
        this.#eventPoints.sort(sortByTime);
        break;
      case 'price':
        this.#eventPoints.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType.type;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEventPoints(sortType);
    this.#clearEventPointsList();
    this.#renderTripList();
  };

  #renderSort() {
    this.#sortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripContainer);
  }

  #clearEventPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
    this.#renderPoints();
  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoints() {
    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    render(new EmptyEventPointsView(), this.#tripContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }
}
