import { SortTypes, UpdateType, UserAction, FilterType, TimeLimit } from '../constants.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { sorting } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import EmptyEventPointsView from '../view/empty-event-points-view.js';
import TripMainContainerView from '../view/trip-main-container-view.js';
import TripListView from '../view/trip-list-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

export default class TripListPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #offersModel = null;
  #tripMainComponent = new TripMainContainerView();
  #tripListComponent = new TripListView();
  #emptyEventPointsComponent = null;
  #currentSortType = SortTypes.DAY;
  #pointsPresenter = new Map();
  #sortPresenter = null;
  #isAdditingType = null;
  #loadingComponent = new LoadingView();
  #newPointPresenter = null;
  #newPointButtonPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenter.get(update.id).setSaving();
        try {
          await this.#eventPointsModel.update(updateType, update);
        } catch (err) {
          this.#pointsPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#eventPointsModel.add(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenter.get(update.id).setDeleting();
        try {
          await this.#eventPointsModel.delete(updateType, update);
        } catch (err) {
          this.#pointsPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

    if (this.#emptyEventPointsComponent) {
      remove(this.#emptyEventPointsComponent);
    }
  };

  #handleNewPointDestroy = ({ isCanceled }) => {
    this.#isAdditingType = false;
    this.#newPointButtonPresenter.enableButton();

    if(!this.eventPoints.length && isCanceled) {
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
      container: this.#tripMainComponent.element,
      currentSortType: this.#currentSortType,
      sortTypeChangeHandler: this.#handleSortTypeChange
    });

    this.#sortPresenter.init();
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy({ isCanceled: true });

    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
    }

    remove(this.#loadingComponent);

    if (this.#emptyEventPointsComponent) {
      remove(this.#emptyEventPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #renderTripMainComponent() {
    render(this.#tripMainComponent, this.#tripContainer);
  }

  #renderTripListComponent() {
    render(this.#tripListComponent, this.#tripMainComponent.element);
  }

  #renderTripBoard() {
    this.#renderTripMainComponent();
    this.#renderTripListComponent();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const eventPoints = this.eventPoints;

    if (!eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();

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

  #renderLoading() {
    render(this.#loadingComponent, this.#tripMainComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyList() {
    this.#emptyEventPointsComponent = new EmptyEventPointsView({filterType: this.#filterType});
    render(this.#emptyEventPointsComponent, this.#tripMainComponent.element);
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
