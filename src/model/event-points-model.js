export default class EventPointsModel {
  constructor(service) {
    this.eventPoints = service.getEventPoints();
  }

  get() {
    return this.eventPoints;
  }

  getById(id) {
    return (
      this.eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }
}
