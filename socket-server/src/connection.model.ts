import { Socket } from "socket.io";

export interface Connection {
  user?: User;
  mobileSocket?: Socket;
  foundrySocket?: Socket;
  token?: string;
}

export interface User {
  active: boolean;
  color: string;
  flags: any;
  hotbar: any;
  name: string;
  permission: any;
  role: number;
  viewedScene: any;
  _id: string;
}

export enum USER_ROLES {
  NONE,
  PLAYER,
  TRUSTED,
  ASSISTANT,
  GAMEMASTER
}
