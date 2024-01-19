import { SortTypes } from '../constants.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
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
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;
  #eventPoints = [];
  #pointsPresenter = new Map();

  constructor ({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
  }

  get eventPoints() {
    return this.#eventPointsModel.eventPoints;
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
    this.#currentSortType = sortType;
    this.#eventPoints = sorting[this.#currentSortType](this.#eventPoints);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortEventPoints(sortType);
    this.#clearEventPointsList();
    this.#renderPoints();
  };

  #renderSort() {
    const sortPresenter = new SortPresenter({
      container: this.#tripContainer,
      defaultSortType: this.#defaultSortType,
      sortTypeChangeHandler: this.#handleSortTypeChange
    });

    sortPresenter.init();
  }

  #clearEventPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
    this.#handleSortTypeChange(this.#defaultSortType);
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
