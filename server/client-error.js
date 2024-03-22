export default class ClientError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
