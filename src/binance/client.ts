import { Connector, Stream } from './webSocket';

export class Client {
  public constructor(private streams: Stream<unknown>[]) {
    Connector.init();
  }

  public startListening(): void {
    this.streams.forEach((stream) => stream.listen());
  }

  public dispose(): void {
    this.streams.forEach((stream) => stream.dispose());
  }
}
