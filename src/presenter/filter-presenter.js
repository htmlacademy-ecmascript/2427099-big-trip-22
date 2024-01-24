import { UpdateType } from '../constants.js';
import { render, replace, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import ListFilterView from '../view/list-filter-view.js';

export default class FilterPresenter {
  #headerContainer = null;
  #eventPointsModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor({headerContainer, eventPointsModel, filterModel}) {
    this.#headerContainer = headerContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
    this.#eventPointsModel.addObserver(this.#handleModeChange);
    this.#filterModel.addObserver(this.#handleModeChange);
  }

  get filters() {
    const eventPoints = this.#eventPointsModel.eventPoints;

    return Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#filterModel.filter,
        isDisabled: !filterPoints(eventPoints).length
      })
    );
  }

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ListFilterView({
      types: filters,
      onTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#headerContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModeChange = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
