import { render } from '../framework/render.js';
import { SortTypes, enabledSortType } from '../constants.js';
import ListSortView from '../view/list-sort-view.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #defaultSortType = null;
  #sortTypeChangeHandler = null;

  constructor({ container, defaultSortType, sortTypeChangeHandler }) {
    this.#container = container;
    this.#defaultSortType = defaultSortType;
    this.#sortTypes = Object.values(SortTypes).map((sortType) => ({
      sortType,
      isChecked: sortType === this.#defaultSortType,
      isDisabled: !enabledSortType[sortType]
    }));
    this.#sortTypeChangeHandler = sortTypeChangeHandler;
  }

  init() {
    render(
      new ListSortView({
        types: this.#sortTypes,
        onTypeChange: this.#sortTypeChangeHandler
      }),
      this.#container
    );
  }
}
