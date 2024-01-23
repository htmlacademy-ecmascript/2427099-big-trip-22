import RadioListView from './radio-list-view.js';

function createFilterTypeTemplate(filter) {
  const { type, isChecked, isDisabled } = filter;

  return (
    `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        data-type="${type}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
    `
  );
}

function createListFilterTemplate(filterTypes) {
  const filterTypesTemplate = filterTypes
    .map((filter) => createFilterTypeTemplate(filter))
    .join('');

  return (
    `
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filterTypesTemplate}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
    `
  );
}

export default class ListFilterView extends RadioListView {
  get template() {
    return createListFilterTemplate(this._types);
  }
}
