import { getEventPoints } from '../mock/event-points.js';

export default class EventPointsModel {
  #eventPoints = [];

  constructor() {
    this.#eventPoints = getEventPoints();
  }

  get() {
    return this.#eventPoints;
  }

  getById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id.toString()) || null
    );
  }
}
