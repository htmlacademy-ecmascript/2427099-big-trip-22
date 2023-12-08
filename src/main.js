import { render } from './render.js';
import ListFilterView from './view/list-filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteTripEventsElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripPresenter = new TripPresenter({ tripContainer: siteTripEventsElement });

render(new ListFilterView(), siteFiltersElement);

tripPresenter.init();
