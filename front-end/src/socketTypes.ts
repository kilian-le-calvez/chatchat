export interface SocketEventsToServer {
  sendChat: (userId: string) => void;
}

export interface SocketEventsToClient {
  receiveChat: (userId: string, msg: string) => void;
}
