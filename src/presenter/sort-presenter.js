import { render, replace, remove } from '../framework/render.js';
import { SortTypes, EnabledSortType } from '../constants.js';
import ListSortView from '../view/list-sort-view.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #sortComponent = null;
  #currentSortType = null;
  #sortTypeChangeHandler = null;

  constructor({ container, currentSortType, sortTypeChangeHandler }) {
    this.#container = container;
    this.#currentSortType = currentSortType;
    this.#sortTypes = Object.values(SortTypes).map((sortType) => ({
      sortType,
      isChecked: sortType === this.#currentSortType,
      isDisabled: !EnabledSortType[sortType]
    }));
    this.#sortTypeChangeHandler = sortTypeChangeHandler;
  }

  init() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new ListSortView({
      types: this.#sortTypes,
      onTypeChange: this.#sortTypeChangeHandler
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#container);
    } else {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    }
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
