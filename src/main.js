import { render, RenderPosition } from './render.js';
import ListFilterView from './view/list-filter-view.js';
import TripHeaderInfoView from './view/trip-header-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripPresenter = new TripPresenter({ tripContainer: siteTripEventsElement });

render(new ListFilterView(), siteFiltersElement);
render(new TripHeaderInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);

tripPresenter.init();
