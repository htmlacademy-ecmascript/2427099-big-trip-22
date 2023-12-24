export default class DestinationModel {
  constructor(service) {
    this.destinations = service.getDestinations();
  }

  get() {
    return this.destinations;
  }

  getById(id) {
    return (
      this.destinations.find((destination) => destination.id === id) || null
    );
  }
}
