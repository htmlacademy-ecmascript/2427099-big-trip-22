import Observable from '../framework/observable.js';

export default class EventPointsModel extends Observable {
  #eventPoints = [];

  constructor(service) {
    super();
    this.#eventPoints = service.getEventPoints();
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  getById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }
}
