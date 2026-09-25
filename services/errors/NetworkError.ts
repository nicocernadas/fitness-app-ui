export class NetworkError extends Error {
  constructor() {
    super("Network request failed")
    this.name = "NetworkError"
  }
}
